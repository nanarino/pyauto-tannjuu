import time
import pyperclip
import pyautogui
import json

#tennjuu === {"姓名":"张京华","年龄":18,"性别":"女","身份证号码":"400100","诊断":"良好","商品名称":"妇炎洁","商品条码":"114514","数量":9,"用法用量":"一天一次"}
tennjuu = pyperclip.paste()
try:
    tennjuu = json.loads(tennjuu.replace("，",",").strip())
except:
    exit()
secs_between_keys = 0.1

def tab(num):
    for i in range(num):
        pyautogui.typewrite(['tab'], interval=secs_between_keys)
def right(num):
    for i in range(num):
        pyautogui.typewrite(['right'], interval=secs_between_keys)
def zcopy(key,ifNone=""):
    pyperclip.copy(str(tennjuu.get(key,ifNone)))
def paste(key,ifNone=""):
    zcopy(key,ifNone)
    pyautogui.hotkey('ctrl', 'v')
def renum(key,ifNone=""):
    value = tennjuu.get(key,ifNone)
    try:
        num = int(["男",'女'].index(value))
    except:
        num = (2 if value else 1)
    return num  


def main():
    paste("姓名")
    tab(1)
    paste("年龄")
    tab(1)
    right(renum("性别"))
    tab(2)
    paste("身份证号码")
    tab(1)
    paste("诊断")
    tab(1)
    num = renum("商品条码",0)
    right(num)
    tab(1)
    paste([None,"商品名称","商品条码"][num])
    tab(3)
    paste("数量")
    zcopy("用法用量")

time.sleep(3)
main()
