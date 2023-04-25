import speedtest
import csv
st = speedtest.Speedtest()
st.get_best_server()

path = 'D:/Omat-koodit/nopeustesti/nopeudet.csv'
header = ['ping','download','upload']
data = [f'{st.results.ping}',f'{round(st.download() / 1000 / 1000, 1)}',f'{round(st.upload() / 1000 / 1000, 1)}']
with open(path,'a',encoding='UTF8') as f:
    writer = csv.writer(f)
    writer.writerow(data)
    f.close()



