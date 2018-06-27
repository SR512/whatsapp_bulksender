/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {

    $('.checked_all').on('change', function () {
        $('.checkbox').prop('checked', $(this).prop("checked"));
    });

    //deselect "checked all", if one of the listed checkbox product is unchecked amd select "checked all" if all of the listed checkbox product is checked

    $('.checkbox').change(function () { //".checkbox" change
        if ($('.checkbox:checked').length == $('.checkbox').length) {
            $('.checked_all').prop('checked', true);
        } else {
            $('.checked_all').prop('checked', false);
        }
    });
    var waitingDialog = waitingDialog || (function ($) {
            'use strict';

            // Creating modal dialog's DOM
            var $dialog = $(
                '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
                '<div class="modal-dialog modal-m">' +
                '<div class="modal-content">' +
                '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
                '<div class="modal-body">' +
                '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
                '</div>' +
                '</div></div></div>');

            return {
                /**
                 * Opens our dialog
                 * @param message Custom message
                 * @param options Custom options:
                 *                  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
                 *                  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
                 */
                show: function (message, options) {
                    // Assigning defaults
                    if (typeof options === 'undefined') {
                        options = {};
                    }
                    if (typeof message === 'undefined') {
                        message = 'Loading';
                    }
                    var settings = $.extend({
                        dialogSize: 'm',
                        progressType: '',
                        onHide: null // This callback runs after the dialog was hidden
                    }, options);

                    // Configuring dialog
                    $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                    $dialog.find('.progress-bar').attr('class', 'progress-bar');
                    if (settings.progressType) {
                        $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                    }
                    $dialog.find('h3').text(message);
                    // Adding callbacks
                    if (typeof settings.onHide === 'function') {
                        $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                            settings.onHide.call($dialog);
                        });
                    }
                    // Opening dialog
                    $dialog.modal();
                },
                /**
                 * Closes dialog
                 */
                hide: function () {
                    $dialog.modal('hide');
                }
            };

        })(jQuery);

    "use strict";

    var body = $("body");

    $(function () {
        $(".preloader").fadeOut();
        $('#side-menu').metisMenu();
    });

    /* ===== Theme Settings ===== */

    $(".open-close").on("click", function () {
        body.toggleClass("show-sidebar").toggleClass("hide-sidebar");
        $(".sidebar-head .open-close i").toggleClass("ti-menu");
    });


    /* ===========================================================
     Loads the correct sidebar on window load.
     collapses the sidebar on window resize.
     Sets the min-height of #page-wrapper to window size.
     =========================================================== */

    $(function () {
        var set = function () {
                var topOffset = 60,
                    width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width,
                    height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse');
                    topOffset = 100;
                    /* 2-row-menu */
                } else {
                    $('div.navbar-collapse').removeClass('collapse');
                }

                /* ===== This is for resizing window ===== */

                if (width < 1170) {
                    body.addClass('content-wrapper');
                    $(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                } else {
                    body.removeClass('content-wrapper');
                }

                height = height - topOffset;
                if (height < 1) {
                    height = 1;
                }
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            },
            url = window.location,
            element = $('ul.nav a').filter(function () {
                return this.href === url || url.href.indexOf(this.href) === 0;
            }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
        $(window).ready(set);
        $(window).bind("resize", set);
    });


    /* ===== Tooltip Initialization ===== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ===== Popover Initialization ===== */

    $(function () {
        $('[data-toggle="popover"]').popover();
    });

    /* ===== Task Initialization ===== */

    $(".list-task li label").on("click", function () {
        $(this).toggleClass("task-done");
    });
    $(".settings_box a").on("click", function () {
        $("ul.theme_color").toggleClass("theme_block");
    });

    /* ===== Collepsible Toggle ===== */

    $(".collapseble").on("click", function () {
        $(".collapseblebox").fadeToggle(350);
    });

    /* ===== Sidebar ===== */

    $('.slimscrollright').slimScroll({
        height: '100%',
        position: 'right',
        size: "5px",
        color: '#dcdcdc'
    });
    $('.slimscrollsidebar').slimScroll({
        height: '100%',
        position: 'right',
        size: "6px",
        color: 'rgba(0,0,0,0.3)'
    });
    $('.chat-list').slimScroll({
        height: '100%',
        position: 'right',
        size: "0px",
        color: '#dcdcdc'
    });

    /* ===== Resize all elements ===== */

    body.trigger("resize");

    /* ===== Visited ul li ===== */

    $('.visited li a').on("click", function (e) {
        $('.visited li').removeClass('active');
        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });

    /* ===== Login and Recover Password ===== */

    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });

    /* =================================================================
     Update 1.5
     this is for close icon when navigation open in mobile view
     ================================================================= */

    $(".navbar-toggle").on("click", function () {
        $(".navbar-toggle i").toggleClass("ti-menu").addClass("ti-close");
    });

    /* =================================================================

     Funcation For Create User Form
     ================================================================= */

    $('#btnSubmit').on('click', function () {

        waitingDialog.show("Please Wait......!");

        var url = $('#formdata').attr('action');

        $.ajax({
            type: "post",
            url: url,
            data: {
                '_token': $('input[name=_token]').val(),
                'FullName': $('input[name=FullName]').val(),
                'Email': $('input[name=Email]').val(),
                'Password': $('input[name=Password]').val()
            },
            success: function (data) {
                if ((data.errors)) {
                    waitingDialog.hide();
                    alert(JSON.stringify((data.errors)));
                }
                else {
                    waitingDialog.hide();
                    $('#table').append("<tr class='item" + data.id + "'>" +
                        "<td>" + data.name + "</td>" +
                        "<td>" + data.email + "</td>" +
                        "<td>" + data.created_at + "</td>" +
                        "<td>" +
                        "<button class='edit-modal btn btn-warning btn-sm' data-id='" + data.id + "' data-title='" + data.name + "' data-content='" + data.email + "'data-password ='" + data.password + "'>" +
                        "<span class='glyphicon glyphicon-pencil'></span>" +
                        "</button> " +
                        "<button class='delete-modal btn btn-danger btn-sm' data-id='" + data.id + "' data-title='" + data.name + "'>" +
                        "<span class='glyphicon glyphicon-trash'></span>" +
                        "</button></td>" +
                        "</tr>");

                }
            }, error: function (data) {
                waitingDialog.hide();
                alert("Try After Some Time...!");
            }

        });

    });

    /* =================================================================

     Funcation For Edit User Form
     ================================================================= */

    $(".edit-modal").on('click', function () {

        $("#footer__action_button").text("Update");
        $(".actionBtn").addClass("btn-success");
        $(".actionBtn").removeClass("btn-danger");
        $(".actionBtn").addClass("edit");
        $(".modal-title").text("Edit User");
        $(".deleteContent").hide();
        $(".form-horizontal").show();

        $("#eid").val($(this).data('id'));
        $("#eFullName").val($(this).data('title'));
        $("#eEmail").val($(this).data('content'));
        $("#epassword").val($(this).data('password'));
        $('#myModal').modal('show');
    });

    $('.modal-footer').on('click', '.edit', function () {

        waitingDialog.show("Please Wait......!");

        var url = $('#edit_user').attr('action');
        var id = $('input[name=eid]').val();

        alert(url);

        $.ajax({
            type: 'post',
            url: url,
            data: {
                '_token': $('input[name=_token]').val(),
                'id': id,
                'eFullName': $('input[name=eFullName]').val(),
                'eEmail': $('input[name=eEmail]').val(),
                'ePassword': $('input[name=ePassword]').val()

            }, success: function (data) {

                if ((data.errors)) {
                    alert(JSON.stringify((data.errors)));
                    waitingDialog.hide();
                }
                else {

                    waitingDialog.hide();
                    location.reload();
                    $('.item' + data.id).replaceWith("" +
                        "<tr class='item" + data.id + "'>" +
                        "<td>" + data.name + "</td>" +
                        "<td>" + data.email + "</td>" +
                        "<td>" + data.created_at + "</td>" +
                        "<td>" +
                        "<button class='edit-modal btn btn-warning btn-sm' data-id='" + data.id + "' data-title='" + data.name + "' data-content='" + data.email + "'data-password ='" + data.password + "'>" +
                        "<span class='glyphicon glyphicon-pencil'></span>" +
                        "</button> " +
                        "<button class='delete-modal btn btn-danger btn-sm' data-id='" + data.id + "' data-title='" + data.name + "'>" +
                        "<span class='glyphicon glyphicon-trash'></span>" +
                        "</button></td>" +
                        "</tr>");


                }

            }, error: function (data) {
                waitingDialog.hide();
                alert("Try After Some Time.....!");
            }
        });
    });

    /* =================================================================

     Funcation For Delete User Form
     ================================================================= */


    $(".delete-modal").on('click', function () {

        $("#footer__action_button").text("Delete");
        $(".actionBtn").addClass("btn-danger");
        $(".actionBtn").removeClass("btn-success");
        $(".actionBtn").addClass("delete");
        $(".modal-title").text("Remove User");
        $(".deleteContent").show();
        $(".form-horizontal").hide();

        $('.id').val($(this).data('id'));

        $('.title').html($(this).data('title'));

        $('#myModal').modal('show');

    });

    $('.modal-footer').on('click', '.delete', function () {

        waitingDialog.show("Please Wait......!");

        $.ajax({
            type: 'DELETE',
            url: $('.id').val(),
            data: {
                '_token': $('input[name=_token]').val(),
            },
            success: function (data) {

                waitingDialog.hide();
                location.reload();

            }, error: function (data) {
                waitingDialog.hide();
                alert("Try After Some Time.....!");
            }
        });
    });

    /*===============================================================

     Funcation For Create User Form
     ================================================================= */

    $('#AddBalance').on('click', function () {

        $('#addBalance').modal('show');


        $('#btnBalance').on('click', function () {

            waitingDialog.show("Please Wait......!");

            var url = $('#formaddbalance').attr('action');

            $.ajax({
                type: "post",
                url: url,
                data: {
                    '_token': $('input[name=_token]').val(),
                    'name': $('select[name=Name]').val(),
                    'sms-type': $('select[name=sms-type]').val(),
                    'Balance': $('input[name=Balance]').val(),
                    'Validity': $('input[name=validity]').val()
                },
                success: function (data) {
                    if ((data.errors)) {
                        waitingDialog.hide();
                        alert(JSON.stringify((data.errors)));
                    }
                    else {
                        waitingDialog.hide();
                        location.reload();

                    }
                }, error: function (data) {
                    waitingDialog.hide();
                    alert("Try After Some Time...!");
                }

            });

        });
    });

    /* =================================================================

     Funcation For Balance Edit Form
     ================================================================= */

    $(".balance-modal").on('click', function () {

        $("#footer__action_button").text("Update");
        $(".actionBtn").addClass("btn-success");
        $(".actionBtn").removeClass("btn-danger");
        $(".actionBtn").addClass("editBalance");
        $(".modal-title").text("ADD BALANCE");
        $(".enableContent").hide();
        $(".form-horizontal").show();

        $("#bid").val($(this).data('id'));
        $("#esms-type").val($(this).data('type'));
        $("#eBalance").val($(this).data('balance'));
        $("#evalidity").val($(this).data('validity'));

        $('#myModal').modal('show');
    });

    $('.modal-footer').on('click', '.editBalance', function () {

        waitingDialog.show("Please Wait......!");

        var id = $('input[name=bid]').val();

        $.ajax({
            type: 'PUT',
            url: id,
            data: {
                '_token': $('input[name=_token]').val(),
                'id': id,
                'type': $('select[name=bsms-type]').val(),
                'balance': $('input[name=eBalance]').val(),
                'validity': $('input[name=evalidity]').val()

            }, success: function (data) {

                if ((data.errors)) {
                    alert(JSON.stringify((data.errors)));
                    waitingDialog.hide();
                }
                else {

                    waitingDialog.hide();
                    location.reload();

                }

            }, error: function (data) {
                waitingDialog.hide();
                alert("Try After Some Time.....!");
            }
        });
    });

    /* =================================================================

     Funcation For Enable User
     ================================================================= */


    $(".Status-modal").on('click', function () {

        $(".actionBtn").addClass("btn-danger");
        $(".actionBtn").removeClass("btn-success");
        $(".actionBtn").addClass("enable");
        $(".modal-title").text("Disable & Enable User.");
        $(".enableContent").show();
        $(".form-horizontal").hide();

        $('.id').val($(this).data('id'));
        $('.href').val($(this).data('href'));

        $('.title').html($(this).data('off') + "&nbsp;" + $(this).data('name'));

        $("#footer__action_button").text(($(this).data('off')));

        $('#myModal').modal('show');

    });

    $('.modal-footer').on('click', '.enable', function () {

        waitingDialog.show("Please Wait......!");

        $.ajax({
            type: 'GET',
            url: $('.href').val(),
            data: {
                '_token': $('input[name=_token]').val()
            },
            success: function (data) {

                waitingDialog.hide();
                location.reload();

            }, error: function (data) {
                waitingDialog.hide();
                alert("Try After Some Time.....!");
            }
        });
    });

    /* =================================================================

     Funcation For Create Contact Name
     ================================================================= */

    $('#AddName').on('click', function () {

        $('#addName').modal('show');


        $('#btnContactName').on('click', function () {
            waitingDialog.show("Please Wait......!");

            var url = $('#formaddbalance').attr('action');

            $.ajax({
                type: "post",
                url: url,
                data: {
                    '_token': $('input[name=_token]').val(),
                    'name': $('input[name=name]').val()
                },
                success: function (data) {
                    if ((data.errors)) {
                        waitingDialog.hide();
                        alert(JSON.stringify((data.errors)));
                    }
                    else {
                        waitingDialog.hide();
                        location.reload();

                    }
                }, error: function (data) {
                    waitingDialog.hide();
                    alert("Try After Some Time...!");
                }

            });

        });
    });
    /*===========================================================================================================================
    Funcation For Delete User Form
    ================================================================= */


    $(".delete-modal").on('click', function () {

        $("#footer__action_button").text("Delete");
        $(".actionBtn").addClass("btn-danger");
        $(".actionBtn").removeClass("btn-success");
        $(".actionBtn").addClass("delete");
        $(".modal-title").text("Remove User");
        $(".deleteContent").show();
        $(".form-horizontal").hide();

        $('.id').val($(this).data('id'));

        $('.title').html($(this).data('title'));

        $('#myModal').modal('show');

    });

    $('.modal-footer').on('click', '.delete', function () {

        waitingDialog.show("Please Wait......!");

        $.ajax({
            type: 'DELETE',
            url: $('.id').val(),
            data: {
                '_token': $('input[name=_token]').val(),
            },
            success: function (data) {

                waitingDialog.hide();
                location.reload();

            }, error: function (data) {
                waitingDialog.hide();
                alert("Try After Some Time.....!");
            }
        });
    });
});
