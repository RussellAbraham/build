requirejs.config({
    baseUrl: 'vendor',
    paths: {
        assets : '../assets'
    }
});

requirejs(['jquery'], function($){
    var _input = document.createElement('input');
    $(document.documentElement).append(_input);
    $(_input).on('keyup', function(){
        $(this).val('');
    });
});