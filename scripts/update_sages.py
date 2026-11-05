import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

SOURCE = 'https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=Hylian+Legends&character=Linkmupi&action=characters'
RANK = 'Sage of the Temple'
path = Path('assets/sage-roster.json')
data = json.loads(path.read_text())
now = datetime.now(timezone.utc).isoformat()
data['last_attempt'] = now

def normalize(text):
    return ' '.join(text.split()).casefold()

def parse_members(html):
    soup = BeautifulSoup(html, 'html.parser')
    if 'hylian legends' not in normalize(soup.get_text(' ', strip=True)):
        raise ValueError('Guild identity not found')
    candidates = []
    for table in soup.find_all('table'):
        rows = [r for r in table.find_all('tr') if r.find_parent('table') is table]
        if not any({'rank', 'name', 'vocation'}.issubset({normalize(c.get_text(' ', strip=True)) for c in r.find_all(['td', 'th'], recursive=False)}) for r in rows):
            continue
        current_rank = None
        roster = []
        for row in rows:
            cells = row.find_all(['td', 'th'], recursive=False)
            for a in row.find_all('a', href=True):
                if a.find_parent('tr') is not row:
                    continue
                query = parse_qs(urlparse(a['href']).query)
                if query.get('subtopic', [''])[0].casefold() != 'characters' or not query.get('name'):
                    continue
                cell = a.find_parent(['td', 'th'])
                index = next((i for i, c in enumerate(cells) if c is cell), None)
                if index is None:
                    continue
                if index > 0:
                    current_rank = cells[0].get_text(' ', strip=True)
                name = a.get_text(' ', strip=True)
                if current_rank and name and normalize(name) == normalize(query['name'][0]):
                    roster.append((current_rank, name))
                break
        if roster:
            candidates.append(roster)
    if not candidates:
        raise ValueError('Recognisable guild member table not found')
    roster = max(candidates, key=len)
    members = sorted({name for rank, name in roster if normalize(rank) == normalize(RANK)}, key=str.casefold)
    if not members:
        raise ValueError('No Sage of the Temple rows found; retaining last known list for review')
    return members

try:
    request = Request(SOURCE, headers={'User-Agent':'HylianLegendsRosterChecker/1.0', 'Accept':'text/html'})
    with urlopen(request, timeout=30) as response:
        if response.status != 200:
            raise ValueError('Unexpected HTTP status')
        html = response.read(3000000).decode(response.headers.get_content_charset() or 'utf-8', errors='replace')
    data['members'] = parse_members(html)
    data['last_successful_check'] = now
    data['status'] = 'ok'
    print('Official guild roster checked successfully')
except Exception as exc:
    data['status'] = 'check_failed'
    print('::warning::Official guild check unsuccessful; previous roster retained: ' + re.sub(r'[\r\n]+', ' ', str(exc)))
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
