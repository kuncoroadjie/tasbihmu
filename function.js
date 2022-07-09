function openDialog(){
    document.getElementById("modal").classList.add("modal-active");
}
function closeModal(){
    document.getElementById("modal").classList.remove("modal-active");
}
var totalTarget = 0;
var totalLafadz = 0;
// var status = "mati";
function runSpeechRecognition() {  		    	           
    // get action element reference
    var action = document.getElementById("action");
    
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "<small>Silakan berbicara...</small>";
        $('.btn-mulai').addClass('btn-disable').prop('disabled', true);
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "<small>Selesai...</small>";

        recognition.stop();
        setTimeout(finishMsg,2000);
        $('.btn-mulai').removeClass('btn-disable').prop('disabled', false);
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;               
        var substr_count = transcript.match(/astaghfirullahaladzim|astagfirullah|subhanallah|alhamdulillah|allahuakbar|allahu akbar|lailahaillallah|lailahailallah/gi).length;
        if(substr_count > 0){
            countLafadz(substr_count);
        }
    };
  
     // start recognition
     recognition.lang ='id-ID';
     recognition.start();
}
// function speak(){
//     let syth = window.speechSynthesis;
//     let utterance = new SpeechSynthesisUtterance();
//     utterance.lang = "id-ID";
   

//     if(status="mati"){
//         status="hidup";
//         utterance.text = "Ini adalah program penghitung dzikir, klik tombol mulai dzikir berwarna hijau untuk memulai. Kemudian silahkan berdzikir sesuai dengan lafadz yang tersedia"; 
//         syth.speak(utterance);
//         utterance.text = "Maka pengitung akan berjalan. Untuk mereset counter, klik tombol reset berwarna merah dibawah counter, maka hitungan akan kembali ke 0";
//         syth.speak(utterance);
        
//     }else if(status="hidup"){
//         syth.cancel();
//         status="mati";
//     }
    
// }        
function finishMsg(){
    action.innerHTML = "<small></small>";
}
function countLafadz(substr_count){
    totalLafadz = totalLafadz + substr_count;
    document.getElementById("counter").innerHTML = totalLafadz; 
    if(totalTarget == 0 || totalLafadz < totalTarget ){
        $('.btn-mulai').removeClass('btn-disable').prop('disabled', false);
    }else{
        setTimeout(finishTarget, 300);
    }
    
}
function resetCounter(){
    totalLafadz=0;
    document.getElementById("counter").innerHTML = 0; 
    $('.btn-mulai').removeClass('btn-disable').prop('disabled', false);
    document.getElementById("target-count").innerHTML = "-";
}
function target(){
    $('.btn-mulai').removeClass('btn-disable').prop('disabled', false);
    let jumlahDzikir = prompt("Masukkan jumlah dzikir", 100);
        if (jumlahDzikir == null || jumlahDzikir == "") {
            
        }else if(isNaN(jumlahDzikir)) {
            window.alert("Input harus angka");
        }else if(jumlahDzikir<=0 ){
            window.alert("Masukkan angka lebih dari 0");
        }else if(jumlahDzikir<=totalLafadz){
            window.alert("Angka harus lebih dari "+totalLafadz);
        }else{
            this.totalTarget = jumlahDzikir;
            document.getElementById("target-count").innerHTML = totalTarget;
            $('.btn-mulai').removeClass('btn-disable').prop('disabled', false);
        }
        
}
function finishTarget(){
    if(totalTarget<=totalLafadz){
        window.alert("Target dzikir sebanyak "+totalTarget+" telah tercapai");
    }
    $('.btn-mulai').addClass('btn-disable').prop('disabled', true);
}