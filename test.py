from pygtrans import Translate

client = Translate()
text = client.translate('Dijon Mustard')
print(text.translatedText)  # 谷歌翻译
# print(translation)