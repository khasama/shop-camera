$(document).ready(function () {
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true,
        },
        crossDomain: true,
    });
    $(".slick").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $("#add-cart").click(() => {
        const id = $("#id-prod").val();
        const quantity = $("#quantity").val();

        if (id && quantity) {
            $.ajax({
                type: "POST",
                url: "/add-cart",
                data: {
                    id,
                    quantity,
                },
                success: (rs) => {
                    if (rs.status == "success") {
                        alert("thêm thành công");
                        location.reload();
                    } else {
                        alert(rs.message);
                    }
                },
            });
        } else {
            alert("Thiếu chi rồi kìa");
        }
    });

    $("#user-register").click(() => {
        const email = $("#register-email").val();
        const username = $("#register-username").val();
        const password = $("#register-password").val();

        if (email && username && password) {
            $.ajax({
                type: "POST",
                url: "/user/register",
                data: {
                    email,
                    username,
                    password,
                },
                success: (rs) => {
                    if (rs.status == "success") {
                        alert("Đăng ký thành công");
                        $("#registerModal").modal("hide");
                        $("#loginModal").modal("show");
                        $("#register-email").val("");
                        $("#register-username").val("");
                        $("#register-password").val("");
                    } else {
                        alert(rs.message);
                    }
                },
            });
        } else {
            alert("Thiếu chi rồi kìa");
        }
    });

    $("#user-login").click(() => {
        const username = $("#login-username").val();
        const password = $("#login-password").val();

        if (username && password) {
            $.ajax({
                type: "POST",
                url: "/user/login",
                data: {
                    username,
                    password,
                },
                success: (rs) => {
                    if (rs.status == "success") {
                        alert("Đăng nhập thành công");
                        window.location = "/";
                    } else {
                        alert(rs.message);
                    }
                },
            });
        } else {
            alert("Thiếu chi rồi kìa");
        }
    });
});
