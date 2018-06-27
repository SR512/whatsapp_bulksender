from flask import session
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import os, inspect
import pandas as pd
import xlsxwriter

import time

driver = None
number_of_times = 5
sendItem = []
notSendItem = []


def wait(web_opening_time=8):
    time.sleep(web_opening_time)


## load web driver for selenium : chrome

def web_driver_load():
    global driver
    driver = webdriver.Chrome('C:\Python35\selenium\webdriver\chromedriver.exe')


## quit web driver for selenium

def web_driver_quit():
    driver.quit()


def web_driver_close():
    driver.close()


# whatsapp Login

def whatsapp_login():
    driver.get('https://web.whatsapp.com/')
    driver.set_page_load_timeout(60 * 5)  # for slow internet
    while True:
        time.sleep(5)
        try:
            appLoad = driver.find_element_by_xpath('//*[@id="app"]')
            if appLoad:
                wait()
                break
        except NoSuchElementException:
            pass
        finally:
            print('Login Checked')


def sendMessage(msg, *df):
    count = 0
    for name in df:
        driver.get('https://web.whatsapp.com/send?phone={}'.format(name))

        while True:
            time.sleep(10)
            try:
                appLoad = driver.find_element_by_xpath('//*[@id="app"]')
                if appLoad:
                    time.sleep(8)
                    web_obj = driver.find_element_by_xpath('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]')
                    web_obj.send_keys(msg)
                    web_obj.send_keys(Keys.RETURN)

                    count = count + 1
                    session['send'] = count

                    balance = int(session.get('Balance'))
                    bal = balance - 1
                    session['Balance'] = str(bal)

                    temp = name
                    sendItem.append(temp)  # add to list

                    time.sleep(8)
                    break
            except NoSuchElementException:
                temp = name
                status = "Not In Whatsapp"

                notSendItem.append(temp)  # add to list
                notSendItem.append(status)

                break
                pass

            finally:
                print('Login Checked')
    # Create a Pandas dataframe from the data.
    df = pd.DataFrame({'Data': sendItem})

    # Create a Pandas Excel writer using XlsxWriter as the engine.
    writer = pd.ExcelWriter('Report_Send.xlsx', engine='xlsxwriter')

    # Convert the dataframe to an XlsxWriter Excel object.
    df.to_excel(writer, sheet_name='Sheet1')

    # Close the Pandas Excel writer and output the Excel file.
    writer.save()

    # Create a Pandas dataframe from the data.
    df = pd.DataFrame({'Data': notSendItem})

    # Create a Pandas Excel writer using XlsxWriter as the engine.
    writer = pd.ExcelWriter('Report_Not_send.xlsx', engine='xlsxwriter')

    # Convert the dataframe to an XlsxWriter Excel object.
    df.to_excel(writer, sheet_name='Sheet1')

    # Close the Pandas Excel writer and output the Excel file.
    writer.save()

    web_driver_quit()


def sendMediaFile(caption, *df, path):
    count = 0
    for name in df:
        driver.get('https://web.whatsapp.com/send?phone={}'.format(name))
        driver.set_page_load_timeout(60 * 5)  # for slow internet
        while True:
            time.sleep(10)
            try:
                appLoad = driver.find_element_by_xpath('//*[@id="app"]')
                if appLoad:
                    time.sleep(10)

                    attech = driver.find_element_by_xpath('//div[@title = "Attach"]')

                    attech.click()

                    file = WebDriverWait(driver, 20).until(
                        EC.presence_of_element_located((By.XPATH, '//input[@type = "file"]')))
                    file.send_keys(path)

                    time.sleep(2)

                    captiontxt = driver.find_element_by_xpath(
                        ' //*[@id="app"]/div/div/div[1]/div[2]/span/div/span/div/div/div[2]/div/span/div/div[2]/div/div[3]/div[1]/div[2]')
                    captiontxt.send_keys(caption)

                    time.sleep(10)

                    button = driver.find_element_by_xpath(
                        '//*[@id="app"]/div/div/div[1]/div[2]/span/div/span/div/div/div[2]/span[2]/div/div')
                    button.click()

                    count = count + 1
                    session['send'] = count

                    balance = int(session.get('Balance'))
                    bal = balance - 1
                    session['Balance'] = str(bal)

                    temp = name
                    status = "Sent"

                    sendItem.append(temp)  # add to list
                    sendItem.append(status)  # add to list

                    time.sleep(10)

                    break
            except NoSuchElementException:

                temp = name
                status = "Not In Whatsapp"

                notSendItem.append(temp)  # add to list
                notSendItem.append(status)
                break
                pass

            finally:
                print('Login Checked')

     # Create a Pandas dataframe from the data.
    df = pd.DataFrame({'Data': sendItem})

    # Create a Pandas Excel writer using XlsxWriter as the engine.
    writer = pd.ExcelWriter('Report_Send.xlsx', engine='xlsxwriter')

    # Convert the dataframe to an XlsxWriter Excel object.
    df.to_excel(writer, sheet_name='Sheet1')

    # Close the Pandas Excel writer and output the Excel file.
    writer.save()

    # Create a Pandas dataframe from the data.
    df = pd.DataFrame({'Data': notSendItem})

    # Create a Pandas Excel writer using XlsxWriter as the engine.
    writer = pd.ExcelWriter('Report_Not_send.xlsx', engine='xlsxwriter')

    # Convert the dataframe to an XlsxWriter Excel object.
    df.to_excel(writer, sheet_name='Sheet1')

    # Close the Pandas Excel writer and output the Excel file.
    writer.save()

    web_driver_close()


def create_new_folder(local_dir):
    newpath = local_dir
    if not os.path.exists(newpath):
        os.makedirs(newpath)
    return newpath
