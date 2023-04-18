import re
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# Fungsi untuk Membersihkan Text
def casefolding(text):
  text = text.lower()                               # Mengubah teks menjadi lower case
  text = re.sub(r'https?://\S+|www\.\S+', '', text) # Menghapus URL
  text = re.sub(r'[-+]?[0-9]+', '', text)           # Menghapus angka
  text = re.sub(r'[^\w\s]','', text)                # Menghapus karakter tanda baca
  text = text.strip()
  return text

# Fungsi untuk Menormalisasi Text
def text_normalize(text,key_norm):
  text = ' '.join([key_norm[key_norm['singkat'] == word]['hasil'].values[0] if (key_norm['singkat'] == word).any() else word for word in text.split()])
  text = str.lower(text)
  return text
  
# Fungsi untuk Menghapus Stopwords

more_stopword = ['tsel', 'gb', 'rb'] # Tambahkan kata dalam daftar stopword

def remove_stop_words(text,stopwords_ind):
  clean_words = []
  text = text.split()
  for word in text:
      if word not in stopwords_ind:
          clean_words.append(word)
  return " ".join(clean_words)

# Fungsi untuk Melakukan Stemming (Bahasa Indonesia)
def stemming(text,stemmer):
  text = stemmer.stem(text)
  return text

# Fungsi untuk Text Pre-Processing
def text_preprocessing_process(text,key_norm,stopwords_ind,stemmer):
  text = casefolding(text)
  text = text_normalize(text,key_norm)
  text = remove_stop_words(text,stopwords_ind)
  text = stemming(text,stemmer)
  return text