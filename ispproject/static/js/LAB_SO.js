$(document).ready(function () {

        sidebar();


        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
            if(dd<10) 
            {
            dd='0'+dd;
            } 

            if(mm<10) 
            {
            mm='0'+mm;
            } 

        today =  `${yyyy}-${mm}-${dd}`;
        $("#dt_wei").val(today);
        $("#dt_list").val(today);


       
       
    
    
   
   
}); 

function sidebar() {
        $("#LAB_SO").addClass('active');
        $("#collapseSO").addClass('show');
       // $('[data-target*="#collapseSO"]').addClass('collapsed');
        $('[href*="LAB_SO.php"]').addClass('active');
    }