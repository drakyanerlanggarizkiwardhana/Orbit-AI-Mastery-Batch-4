'''
	Contoh Deloyment untuk Domain Reinforcement Learning (RL)
	Orbit Future Academy - AI Mastery - KM Batch 3
	Tim Deployment
	2022
'''

# =[Modules dan Packages]========================

from flask import Flask,render_template,request,jsonify
import numpy as np
import gym
import pickle

# =[Variabel Global]=============================

app  = Flask(__name__, static_url_path='/static')
env  = None

peta        = None
pilihanPeta = None

Q_table     = None
Q_table_all = None

n_observations = None
n_actions      = None

robot_current_state = 0

peta_1 = ['SFFF','FHFH','FFFH','HFFG']
peta_2 = ['SFFF','FFHF','HFFF','HFFG']
peta_3 = ['SHFF','FHFH','FFFH','HHFG']
peta_4 = ['SFFF','HHFF','FFFF','HFFG']
peta_5 = ['SFFH','FFFH','HFFH','HHFG']

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]	
@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API : Reset Environment]	
@app.route("/api/reset",methods=['GET'])
def apiReset():
	# Variabel Global
	global peta
	global env
	
	if request.method=='GET':
		# Reset environment
		env = gym.make("FrozenLake-v0",is_slippery=False, desc=peta)
		env.reset()
	
		# Set nilai state menjadi nilai awal
		robot_current_state = 0
		
		# Konversi peta dari array atau list menjadi string
		peta_string = peta[0] + peta[1] + peta[2] + peta[3]
		
		# Return peta dan current state dengan format JSON
		return jsonify({
			"peta"  : peta_string,
			"state" : robot_current_state 
		})

# [Routing untuk API : Menggerakkan Si Kuning (Pemain)]
@app.route("/api/gerak",methods=['POST'])
def apiGerak():
	# Variabel Global
	global env

	gerak = None
	
	if request.method=='POST':
		# Set nilai aksi atau gerak berdasarkan input dari pengguna
		gerak = float(request.form['gerak'])
		
		# Agent melakukan aksi pada environment
		new_state, reward, done, info = env.step(gerak)
		
		# Update nilai state setelah agent melakukan aksi
		robot_current_state = new_state
		
		# Return current state dan kondisi apakah permainan berakhir 
		# dengan format JSON
		return jsonify({
			"state": robot_current_state,
			"done" : done
		})

# [Routing untuk API : Mendapatkan Peta]		
@app.route("/api/getPeta",methods=['GET'])
def apiGetPeta():
	# Variabel Global
	global peta
	
	if request.method=='GET':
		# Konversi peta dari array atau list menjadi string
		peta_string = peta[0] + peta[1] + peta[2] + peta[3]
		
		# Return peta dengan format JSON
		return jsonify({
			"peta" : peta_string
		})

# [Routing untuk API : Memilih Peta]		
@app.route("/api/setPeta",methods=['POST'])
def apiSetPeta():
	# Variabel Global
	global peta
	global env
	global pilihanPeta
	
	if request.method=='POST':
		# Set nilai pilihan peta berdasarkan input dari pengguna
		pilihanPeta = int(request.form['pilihanPeta'])
		
		# Update peta berdasarkan pilihan pengguna
		if(pilihanPeta ==1):
			peta = peta_1
		elif(pilihanPeta ==2):
			peta = peta_2
		elif(pilihanPeta ==3):
			peta = peta_3
		elif(pilihanPeta ==4):
			peta = peta_4
		elif(pilihanPeta ==5):
			peta = peta_5
		else:
			peta = peta_1
		
		# Reset environment
		env = gym.make("FrozenLake-v0",is_slippery=False, desc=peta)
		env.reset()
		
		# Konversi peta dari array atau list menjadi string
		peta_string = peta[0] + peta[1] + peta[2] + peta[3]
		
		# Return peta dengan format JSON
		return jsonify({
			"peta" : peta_string
		})

# [Routing untuk API : Robot melakukan training/pembelajaran]		
@app.route("/api/robotBelajar",methods=['GET'])
def apiRobotBelajar():
	# Variabel Global
	global Q_table_all
	global Q_table
	
	if request.method=='GET':
		# Set Q-table sesuai peta saat ini
		Q_table = Q_table_all[pilihanPeta-1]
		
		# Return status apakah robot sudah selesai belajar
		# dengan format JSON
		return jsonify({
			"belajar" : "selesai"
		})

# [Routing untuk API : Menggerakkan Si Kuning (Robot)]		
@app.route("/api/gerakRobot",methods=['GET'])
def apiGerakRobot():
	# Variabel Global
	global env
	global robot_current_state
	global Q_table
	
	if request.method=='GET':
		# Mendapatkan aksi terbaik untuk agent pada current state		
		best_action = np.argmax(Q_table[robot_current_state])

		# Agent melakukan aksi pada environment
		new_state, reward, done, info = env.step(best_action)
		
		# Update nilai state setelah agent melakukan aksi
		robot_current_state = new_state
		
		# Return current state dan kondisi apakah permainan berakhir 
		# dengan format JSON
		return jsonify({
			"state": robot_current_state,
			"done" : done
		})

# =[Main]========================================

if __name__ == '__main__':
	
	# Peta Default
	peta = peta_1
	pilihanPeta = 1
	
	# Load Environment
	env = gym.make("FrozenLake-v0",is_slippery=False, desc=peta)
	env.reset()

	robot_current_state = 0
	
	# Load Model (Q-Table) 
	Q_table_all = pickle.load(open('Q_table_Frozen_Lake.model', 'rb'))

	# Run Flask di localhost 
	app.run(host="localhost", port=5000, debug=True)
	
	


