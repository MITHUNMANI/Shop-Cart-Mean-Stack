import { Component, OnInit } from '@angular/core';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GroceryStore';

  ngOnInit() {
    jQuery(document).ready(function ($) {
      $('.scroll').click(function (event) {
        event.preventDefault();
        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
      });
    });

    $(document).ready(function () {
      const navoffeset = $('.agileits_header').offset().top;
      $(window).scroll(function () {
        const scrollpos = $(window).scrollTop();
        if (scrollpos >= navoffeset) {
          $('.agileits_header').addClass('fixed');
        } else {
          $('.agileits_header').removeClass('fixed');
        }
      });

    });

    $(document).ready(() => {
      $('.dropdown').hover(
        function () {
          $('.dropdown-menu', this).stop(true, true).slideDown('fast');
          $(this).toggleClass('open');
        },
        function () {
          $('.dropdown-menu', this).stop(true, true).slideUp('fast');
          $(this).toggleClass('open');
        }
      );
    });

    $(document).ready(() => {
      
        var defaults = {
        containerID: 'toTop', // fading element id
        containerHoverID: 'toTopHover', // fading element hover id
        scrollSpeed: 1200,
        easingType: 'linear'
        };
      

      $().UItoTop({ easingType: 'easeOutQuart' });

    });
    $('.example1').wmuSlider();         
  }
}
