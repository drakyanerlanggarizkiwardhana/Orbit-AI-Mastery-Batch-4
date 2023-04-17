'''
	Contoh Deloyment untuk Domain Natural Language Processing (NLP)
	Orbit Future Academy - AI Mastery - KM Batch 3
	Tim Deployment
	2022
'''

# =[Modules dan Packages]========================

from flask import Flask,render_template,request,jsonify
import pandas as pd
import numpy as np
from joblib import load
import re
import pickle
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from fungsi import *

# =[Variabel Global]=============================

app   = Flask(__name__, static_url_path='/static')
model = None

stopwords_ind = None
key_norm      = None
factory       = None
stemmer       = None
vocab         = None

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]	
@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API]		
@app.route("/api/deteksi",methods=['POST'])
def apiDeteksi():
	# Nilai default untuk string input 
	text_input = ""
	
	if request.method=='POST':
		# Set nilai string input dari pengguna
		text_input = request.form['data']
		
		# Text Pre-Processing
		text_input = text_preprocessing_process(text_input,key_norm,stopwords_ind,stemmer)

		# TF-IDF
		tf_idf_vec = TfidfVectorizer(decode_error="replace", vocabulary=set(vocab))

		# Prediksi (Penipuan, Promo, atau Normal)
		hasil = model.predict(tf_idf_vec.fit_transform([text_input]))

		if(hasil==0):
			hasil_prediksi = "Normal"
		elif (hasil==1):
			hasil_prediksi = "Penipuan"
		else:
			hasil_prediksi = "Promo"
		
		# Return hasil prediksi dengan format JSON
		return jsonify({
			"data": hasil_prediksi,
		})

# =[Main]========================================

if __name__ == '__main__':
	
	# Setup
	stopwords_ind = stopwords.words('indonesian')
	stopwords_ind = stopwords_ind + more_stopword
	
	key_norm = pd.read_csv('key_norm.csv')
	
	factory = StemmerFactory()
	stemmer = factory.create_stemmer()
	
	vocab = pickle.load(open('kbest_feature.pickle', 'rb'))
	
	# Load model yang telah ditraining
	model = load('model_spam_tfidf_nb.model')

	# Run Flask di localhost 
	app.run(host="localhost", port=5000, debug=True)
	
	


