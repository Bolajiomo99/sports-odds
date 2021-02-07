
import requests
import json
import datetime
from datetime import timedelta
import dateutil.parser
import pytz
from datetime import datetime
import sys

my_date = datetime.now()
resp = requests.get('https://api.gambitprofit.com/gambit-plays?_sort=PlayDate:DESC')
gambitGames = json.loads(resp.content)

allCurrentGames = []
highRiskGames = []
for game in gambitGames:
    if game['PlayDate']>my_date.isoformat()[:-3]+'Z':
        allCurrentGames.append(game['Team1']['Name']+' vs '+game['Team2']['Name'])
        if game['Team1']['Reward']<1.3 or game['Team2']['Reward']<1.3:
            # print('This Game has odds less than 1.3')
            reward1=str(game['Team1']['Reward'])
            reward2=str(game['Team2']['Reward'])
            # print(game['Team1']['Name']+' '+reward1+' vs '+game['Team2']['Name']+" "+reward2)
            highRiskGames.append(game['Team1']['Name']+' '+reward1+' vs '+game['Team2']['Name']+" "+reward2)


print(allCurrentGames)
sys.stdout.flush()