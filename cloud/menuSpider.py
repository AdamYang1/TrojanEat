from lxml import etree
import requests
import json
import os
import pymysql
from pygtrans import Translate
client = Translate()

venues = {'PKS_RAW': 518, 'EVK_RAW': 514, 'VLG_RAW': 27229}


class MenuSpider:
    def __init__(self):
        self.url = 'https://hospitality.usc.edu/residential-dining-menus/?menu_venue=venue-{}&menu_date={}'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1'
        }
        self.db = pymysql.connect(
                                host= "us-cdbr-east-05.cleardb.net",
                                port=3306,
                                user= "b12f50cb8ad7c6",
                                password= "89c03a83",
                                database= "heroku_e1b49fc3ea33877",
                                charset='utf8')
        self.cur = self.db.cursor()
        self.all_list = []

    def get_data(self, url, date_str):
        html = requests.get(url=url, headers=self.headers).text
        return self.parse_html(html, date_str)

    def parse_html(self, html, date_str):
        p = etree.HTML(html)
        div_list = p.xpath('//div[@class="col-sm-6 col-md-4"]')
        items = {}
        for div in div_list:
            time = div.xpath('.//h3/text()')[0].strip()
            types = div.xpath('.//h4/text()')
            type_dict = {}
            for i, type in enumerate(types):
                foods = div.xpath('.//ul[%d]/li' % (i + 1))
                food_list = []
                for food in foods:
                    food_str = food.xpath('./text()')[0].strip()
                    food_trans = client.translate(food_str)
                    food_trans_str = food_trans.translatedText
                    attributes = food.xpath('./span//i/span')
                    attr_list = []
                    attr_str = ''
                    for attribute in attributes:
                        attr_list.append(attribute.xpath('./text()')[0].strip())
                        attr_str += attribute.xpath('./text()')[0].strip() + ', '
                    attr_str.rstrip(', ')
                    food_list.append({food_str: attr_list})
                    temp = date_str.split('/')
                    new_date_str = '%s-%s-%s' % (temp[2], temp[0], temp[1])
                    self.all_list.append((new_date_str, time, type, food_trans_str, food_str, attr_str))
                    # self.all_list.append((new_date_str, time, type, translation, attr_str))
                type_dict[type] = food_list
            items[time] = type_dict
        return items

    def save_data(self, items, date_str):
        if not os.path.exists('./result'):
            os.mkdir('result')
        with open('result/menu_{}_{}_{}.json'.format(
                date_str.split('/')[0],
                date_str.split('/')[1],
                date_str.split('/')[2]), 'w') as f:
            json.dump(items, f)

    def save_to_sql(self, venue):
        sql = "insert into heroku_e1b49fc3ea33877." + venue + " VALUES (%s,%s,%s,%s,%s,%s);"
        try:
            self.cur.executemany(sql, self.all_list)
            self.db.commit()
        except Exception as e:
            print(e)
            self.db.rollback()

    def run(self):
        from datetime import date, timedelta
        # print(""" 
        # Which dining venue menu do you want?
        #     1. Parkside
        #     2. EVK
        #     3. Village
        # Enter the name!
        # """)
        # while True:
            # choice = input('Enter your choice: ')
            # if choice in ['Parkside', 'EVK', 'Village']:
            #     break
            # print("Enter the right name!!!")
        start_year = int(input('Enter start year: '))
        start_month = int(input('Enter start month: '))
        start_day = int(input('Enter start day: '))
        end_year = int(input('Enter end year: '))
        end_month = int(input('Enter end month: '))
        end_day = int(input('Enter end day: '))
        d0 = date(start_year, start_month, start_day)
        d1 = date(end_year, end_month, end_day)
        delta = d1 - d0
        f = open('dates.txt', 'a+')
        f.seek(0)
        data = f.read()
        for i in range(delta.days + 1):
            curr_date = d0 + timedelta(days=i)
            date_str = curr_date.strftime("%m/%d/%Y")
            if date_str in data:
                print('%s data exists' % date_str)
                continue
            else:
                f.write(date_str + '\n')
            for key, value in venues.items():
                url = self.url.format(venues[key], date_str)
                result = self.get_data(url, date_str)
                # self.save_data(result, date_str)
                self.save_to_sql(key.lower())
                self.all_list = []
                print('Finished for %s date %s' % (key, date_str))
        self.cur.close()
        self.db.close()
        # print(self.all_list)


if __name__ == '__main__':
    spider = MenuSpider()
    spider.run()
