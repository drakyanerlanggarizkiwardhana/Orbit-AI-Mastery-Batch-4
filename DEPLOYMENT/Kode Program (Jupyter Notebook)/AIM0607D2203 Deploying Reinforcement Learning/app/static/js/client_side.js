$(document).ready(function(){
  
  // ======================================================
  // [Wait]
  // ======================================================
  
  function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
		end = new Date().getTime();
	}
  }
  
  // ======================================================
  // [Animasi Scroll]
  // ======================================================
  
  $(".navbar a, footer a[href='#halamanku']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    } 
  });
  
  // ------------------------------------------------------
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
  
  // ======================================================
  // [Peta]
  // ======================================================
  
  // Fungsi untuk memanggil API agar mangganti peta 
  // sesuai dengan peta yang diinginkan pemain/pengguna
  function set_peta(pilihanPeta) {
    // Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
			  url  : "/api/setPeta",
			  type : "POST",
			  data : { "pilihanPeta" : pilihanPeta },
			  success:function(res){
				// Ambil data peta dari API
				res_data_peta = res['peta']
				peta = res_data_peta
				
				// Reset Environment setelah peta berganti
				reset_environment(false);
				
				// Display Tombol Pilihan Peta setelah peta berganti
				display_tombol_pilihan_peta(pilihanPeta);
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)
  }
  
  // ------------------------------------------------------
  
  // Fungsi untuk memanggil API agar mendapatkan peta
  function get_peta() {
	// Panggil API dengan timeout 1 detik (1000 ms)
	setTimeout(function() {
		try {
			$.ajax({
			  url  : "/api/getPeta",
			  type : "GET",
			  success:function(res){
				// Ambil data peta dari API
				res_data_peta = res['peta']
				peta = res_data_peta
				
				// Render Environment
				render_environment(peta,state);
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
	}, 1000)
  }
  


  // ======================================================
  // [Render dan Display]
  // ======================================================
	
  // Fungsi untuk melakukan render environment
  function render_environment(peta,state) {
	// Isi HTML untuk bagian Environment
    var str="";
    str += '<div class="grid-container">';
	
	for (let i = 0; i < 16; i++) {
		switch(peta[i]) {
			case 'S':
				if(state == i) {
					str += '<div class="grid-item-beku-pemain">';
				} else {
					str += '<div class="grid-item-awal">';
				}
				break;
			case 'F':
				if(state == i) {
					str += '<div class="grid-item-beku-pemain">';
				} else {
					str += '<div class="grid-item-beku">';
				}
				break;
			case 'H':
				if(state == i) {
					str += '<div class="grid-item-lubang-pemain">';
				} else {
					str += '<div class="grid-item-lubang">';
				}
				break;
			case 'G':
				if(state == i) {
					str += '<div class="grid-item-goal-pemain">';
				} else {
					str += '<div class="grid-item-goal">';
				}
				break;
			default:
				break;
		}
		
		str += (i+1) + '</div>'
	}
    
    str += '</div>';
	
	// Render Environment
    $("#env_permainan").html(str);
  }  
  
  // ------------------------------------------------------
  
  // Fungsi untuk melakukan display Tombol Pilihan Peta
  function display_tombol_pilihan_peta(pilihanPeta) {
	// Isi HTML untuk bagian Tombol Pilihan Peta
	var str="";
	str += '<tr>';
	
	for (let i = 1; i <= 5; i++) {
		str += '<td><button type="submit" id="tombol_peta' + i + '" ';
		if(pilihanPeta == i) {
			str += 'class="btn btn-primary btn-lg">';
		} else {
			str += 'class="btn btn-default btn-lg">';
		}
		str += i + '</button></td>';
	}
	
	str += '</tr>';
	
	// Update display Tombol Pilihan Peta
	$("#tombol_pilihan_peta").html(str);  
	
	// Update Event Listener untuk Tombol Pilihan Peta 1
	$("#tombol_peta1").click(function(e) {
		e.preventDefault();

		var pilihanPeta = 1;  
		set_peta(pilihanPeta);
	})
	
    // Update Event Listener untuk Tombol Pilihan Peta 2	
	$("#tombol_peta2").click(function(e) {
		e.preventDefault();
		
		var pilihanPeta = 2; 
		set_peta(pilihanPeta);
	})
	
    // Update Event Listener untuk Tombol Pilihan Peta 3		
	$("#tombol_peta3").click(function(e) {
		e.preventDefault();
		
		var pilihanPeta = 3;  
		set_peta(pilihanPeta);
	})
	  
	// Update Event Listener untuk Tombol Pilihan Peta 4	
	$("#tombol_peta4").click(function(e) {
		e.preventDefault();
		
		var pilihanPeta = 4;
		set_peta(pilihanPeta);
	})
	
    // Update Event Listener untuk Tombol Pilihan Peta 5		
	$("#tombol_peta5").click(function(e) {
		e.preventDefault();
		
		var pilihanPeta = 5;  
		set_peta(pilihanPeta);
	})
  }
  
  // ------------------------------------------------------
  
  // Fungsi untuk melakukan display status permainan
  function display_status_permainan(pesan) {
	// Isi HTML untuk bagian Status Permainan
	var str="";
	str += '<div align="center">';
	str += '<h3 style="padding-left:50px;">';
	str += pesan;
	str += '</h3></div>';
	
	// Update display Status Permainan
	$("#status_permainan").html(str);
  }
  
  // ======================================================
  // [Reset Environment]
  // ======================================================
  
  // Fungsi untuk memanggil API agar melakukan reset environment
  function reset_environment(robot) {
	// Panggil API dengan timeout 1 detik (1000 ms)
	setTimeout(function() {
		try {
			$.ajax({
			  url  : "/api/reset",
			  type : "GET",
			  success:function(res){
				// Ambil data peta dan state dari API
				res_data_peta  = res['peta']
				res_data_state = res['state']
				
				// Set nilai state dan peta
				state = parseInt(res_data_state)
				peta  = res_data_peta
				
				// Render Environment
				render_environment(peta,state);
				
				if(!robot){
					// Aktifkan Tombol Kendali Agent
					$('#tombol_gerak_kanan').prop("disabled", false);
					$('#tombol_gerak_kiri').prop("disabled", false);
					$('#tombol_gerak_atas').prop("disabled", false);
					$('#tombol_gerak_bawah').prop("disabled", false);
					
					// Aktifkan Tombol Mainkan Robot
					$('#tombol_robot').prop("disabled", false);
					
					// Aktifkan Tombol Pilihan Peta
					$('#tombol_peta1').prop("disabled", false);
					$('#tombol_peta2').prop("disabled", false);
					$('#tombol_peta3').prop("disabled", false);
					$('#tombol_peta4').prop("disabled", false);
					$('#tombol_peta5').prop("disabled", false);
					
					// Tampilkan Status Permainan agar pemain/pengguna
					// dapat menggerakkan agent (Si Kuning)
					pesan = 'Silahkan gerakkan Si Kuning'
					display_status_permainan(pesan);
				}
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
	}, 1000)
  }
  
  // ======================================================
  // [Cek Menang atau Kalah]
  // ======================================================
  
  // Fungsi untuk memeriksa apakah Agent Menang atau Tidak
  // (Agent menang jika berhasil mencapai goal)
  function cek_menang(state,robot) {
	// Periksa apakah agent berada di state 15 (Goal/Menang)
	if(state == 15) {		
		// Non-aktifkan tombol kendali agent (Si Kuning)
		$('#tombol_gerak_kanan').prop("disabled", true);
		$('#tombol_gerak_kiri').prop("disabled", true);
		$('#tombol_gerak_atas').prop("disabled", true);
		$('#tombol_gerak_bawah').prop("disabled", true);
		
		// Tampilkan Status Permainan bahwa pemain/agent robot menang
		if(robot) {
			pesan = 'Robot Menang :)'
			display_status_permainan(pesan);
		} else {
			pesan = 'Anda Menang :)'
			display_status_permainan(pesan);
		}
	}
  }	  
  
  // ------------------------------------------------------
  
  // Fungsi untuk memeriksa apakah Agent Kalah atau Tidak
  // (Agent kalah jika masuk lubang)
  function cek_kalah(state,robot) {
	// Periksa apakah agent berada di salah satu lubang
    if(peta[state] == 'H') {
		// Non-aktifkan tombol kendali agent (Si Kuning)
		$('#tombol_gerak_kanan').prop("disabled", true);
		$('#tombol_gerak_kiri').prop("disabled", true);
		$('#tombol_gerak_atas').prop("disabled", true);
		$('#tombol_gerak_bawah').prop("disabled", true);
		
		// Tampilkan Status Permainan bahwa pemain/agent robot kalah
		if(robot) {
			pesan = 'Robot Kalah :('
			display_status_permainan(pesan);
		} else {
			pesan = 'Anda Kalah :('
			display_status_permainan(pesan);
		}
	}
  }
  
  // ======================================================
  // [Kendali Agent dari Pengguna]
  // ======================================================
  
  // Fungsi memanggil API untuk menggerakkan Agent (Si Kuning)
  function kirim_gerak(gerak) {
    // Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
			  url  : "/api/gerak",
			  type : "POST",
			  data : { "gerak" : gerak },
			  success:function(res){
				// Ambil nilai state dan status apakah permainan berakhir dari API
				res_data_state = res['state']
				res_data_done  = res['done']
				
				// Set nilai state dan status apakah permainan berakhir
				state = parseInt(res_data_state)
				done  = res_data_done
				
				// Render Environment
				render_environment(peta,state);
				
				// Cek Menang atau Kalah
				cek_menang(state,false);
				cek_kalah(state,false);
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)
  }
  
  // ======================================================
  // [Robot Agent]
  // ======================================================
  
  // Inisialisasi index getak robot atau nilai 
  // yang menunjukkan sudah berapa kali agent robot 
  // melakukan gerak/aksi
  var indexGerakRobot = 0;
  
  // Fungsi untuk memanggil API agar Menggerakkan Agent Robot
  function gerak_robot() {
	// Tampilkan Status Permainan bahwa robot sedang bermain
	pesan = 'Robot sedang bermain'
	display_status_permainan(pesan);
	  
	// Panggil API dengan timeout 1 detik (1000 ms)
	setTimeout(function() {
		try {
			$.ajax({
			  url  : "/api/gerakRobot",
			  type : "GET",
			  success:function(res){
				// Ambil nilai state dan status apakah permainan berakhir dari API
				res_data_state = res['state']
				res_data_done  = res['done']
				
				// Set nilai state dan status apakah permainan berakhir
				state = parseInt(res_data_state)
				done  = res_data_done
				
				// Render Environment
				render_environment(peta,state);
				
				// Cek Menang atau Kalah
				cek_menang(state,true);
				cek_kalah(state,true);
				
				// Tunggu 
				wait(10);
				
				// Panggil fungsi untuk mendapatkan gerak/aksi 
			    // agent robot selanjutnya jika agent robot
				// belum melakukan gerak/aksi sebanyak 10 kali
				if(indexGerakRobot < 10 & done == false) {
					gerak_robot();
				} else {
					// Namun jika agent belum mencapai goal, 
					// tampilkan status permainan 
					// bahwa robot kalah
					if(state != 15) {
						pesan = 'Robot kalah (tidak goal) :('
						display_status_permainan(pesan);
					}
				}
				
				// Update sudah berapa kali agent robot 
				// melakukan gerak/aksi
				indexGerakRobot +=1;
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
	}, 1000)
  }
  
  // ------------------------------------------------------
  
  // Fungsi untuk memanggil API agar agent robot melakukan
  // training/pembelajar terhadap environment saat ini
  function robot_belajar() {
	// Tampilkan Status Permainan bahwa agent robot
	// sedang belajar
	pesan = 'Robot sedang belajar'
	display_status_permainan(pesan);
	  
	// Panggil API dengan timeout 1 detik (1000 ms)
	setTimeout(function() {
		try {
			$.ajax({
			  url  : "/api/robotBelajar",
			  type : "GET",
			  success:function(res){
				// Ambil status agent robot sudah belajar atau belum dari API
				res_data_belajar  = res['belajar']
				
				// Jika agent robot sudah selesai belajar, maka ...
				if(res_data_belajar == 'selesai') {
					// Reset Environment
					reset_environment(true); 
					done = 'False'
					
					// Tunggu 
					wait(1000)	
					
					// Inisialisasi index getak robot atau nilai 
					// yang menunjukkan sudah berapa kali agent robot 
					// melakukan gerak/aksi
					indexGerakRobot = 0
					
					// Panggil fungsi untuk mendapatkan gerak/aksi 
			        // agent robot pertama kalinya
					gerak_robot();		
				}
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
	}, 8000)
  }
  
  // ======================================================
  // [Event untuk Kendali Agent dari Pengguna]
  // ======================================================
  
  // Fungsi ketika tombol gerak kanan ditekan
  $("#tombol_gerak_kanan").click(function(e) {
    e.preventDefault();
	
	// Set aksi/gerak dari input pengguna
	// 2 : ke kanan
    var gerak = 2; 
	
	// Panggil fungsi untuk menggerakkan Agent (Si Kuning)
	kirim_gerak(gerak);    
  })
  
  // ------------------------------------------------------
  
  // Fungsi ketika tombol gerak kiri ditekan
  $("#tombol_gerak_kiri").click(function(e) {
    e.preventDefault();
	
	// Set aksi/gerak dari input pengguna
	// 0 : ke kiri
    var gerak = 0;
	
	// Panggil fungsi untuk menggerakkan Agent (Si Kuning)
	kirim_gerak(gerak);    
  })
  
  // ------------------------------------------------------
  
  // Fungsi ketika tombol gerak atas ditekan
  $("#tombol_gerak_atas").click(function(e) {
    e.preventDefault();
	
	// Set aksi/gerak dari input pengguna
	// 3 : ke atas
    var gerak = 3;
	
	// Panggil fungsi untuk menggerakkan Agent (Si Kuning)
	kirim_gerak(gerak);    
  })
  
  // ------------------------------------------------------
  
  // Fungsi ketika tombol gerak bawah ditekan
  $("#tombol_gerak_bawah").click(function(e) {
    e.preventDefault();
	
	// Set aksi/gerak dari input pengguna
	// 1 : ke bawah
    var gerak = 1;
	
	// Panggil fungsi untuk menggerakkan Agent (Si Kuning)
	kirim_gerak(gerak);    
  })
  
  // ======================================================
  // [Event untuk Tombol Mengulangi Permainan]
  // ======================================================
  
  // Fungsi ketika tombol mengulangi permainan ditekan
  $("#tombol_reset").click(function(e) {
    e.preventDefault();
	
	// Reset Environment
	reset_environment(false);   
  })
  
  // ======================================================
  // [Event untuk Tombol Memilih Peta]
  // ======================================================
  
  // Fungsi ketika tombol peta 1 ditekan
  $("#tombol_peta1").click(function(e) {
    e.preventDefault();
	
	// Set Peta 1
	var pilihanPeta = 1;  
	set_peta(pilihanPeta);
  })
  
  // ------------------------------------------------------
  
  // Fungsi ketika tombol peta 2 ditekan
  $("#tombol_peta2").click(function(e) {
    e.preventDefault();
	
	// Set Peta 2
	var pilihanPeta = 2; 
	set_peta(pilihanPeta);
  })
  
  // ------------------------------------------------------
  
  // Fungsi ketika tombol peta 3 ditekan
  $("#tombol_peta3").click(function(e) {
    e.preventDefault();
	
	// Set Peta 3
	var pilihanPeta = 3;  
	set_peta(pilihanPeta);
  })
  
  // ------------------------------------------------------
  
  // Fungsi ketika tombol peta 4 ditekan
  $("#tombol_peta4").click(function(e) {
    e.preventDefault();
	
	// Set Peta 4
	var pilihanPeta = 4;
	set_peta(pilihanPeta);
  })
  
  // ------------------------------------------------------
  
  // Fungsi ketika tombol peta 5 ditekan
  $("#tombol_peta5").click(function(e) {
    e.preventDefault();
	
	// Set Peta 5
	var pilihanPeta = 5;  
	set_peta(pilihanPeta);
  })
  
  // ======================================================
  // [Event untuk Tombol Mainkan Robot]
  // ======================================================
  
  // Fungsi ketika tombol mainkan robot ditekan
  $("#tombol_robot").click(function(e) {
    e.preventDefault();
	
	// Non-aktifkan tombol kendali agent (Si Kuning)
	$('#tombol_gerak_kanan').prop("disabled", true);
	$('#tombol_gerak_kiri').prop("disabled", true);
	$('#tombol_gerak_atas').prop("disabled", true);
	$('#tombol_gerak_bawah').prop("disabled", true);
	
	// Non-aktifkan tombol mainkan robot
	$('#tombol_robot').prop("disabled", true);
	
	// Non-aktifkan tombol pilihan peta
	$('#tombol_peta1').prop("disabled", true);
	$('#tombol_peta2').prop("disabled", true);
	$('#tombol_peta3').prop("disabled", true);
	$('#tombol_peta4').prop("disabled", true);
	$('#tombol_peta5').prop("disabled", true);
	
	// Panggil fungsi agar robot/agent mempelajari environment
	robot_belajar();
  })
  
  // ======================================================
  // [Main]
  // ======================================================
  
  var peta  = '';
  var state = 0;
  var done  = 'False';
  
  reset_environment(false);  
})
  
