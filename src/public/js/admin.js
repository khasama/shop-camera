let addShortProd, addProdDes, editShortProd, editProdDes;
$(document).ready(function () {
    $("#dataTable").DataTable();

    ClassicEditor.create(document.querySelector("#addShortProd")).then(
        (editor) => {
            addShortProd = editor;
        }
    );
    ClassicEditor.create(document.querySelector("#addProdDes")).then(
        (editor) => {
            addProdDes = editor;
        }
    );
    ClassicEditor.create(document.querySelector("#editShortProd")).then(
        (editor) => {
            editShortProd = editor;
        }
    );
    ClassicEditor.create(document.querySelector("#editProdDes")).then(
        (editor) => {
            editProdDes = editor;
        }
    );

    $("#createProduct").click(() => {
        const name = $("#addNameProd").val();
        const short = addShortProd.getData();
        const description = addProdDes.getData();
        const high = $("#addHighPriceProd").val();
        const low = $("#addLowPriceProd").val();
        const thumb = $("#addThumbProd").val();
        const category = $("#addCategoryProd").val();
        if (name && short && description && high && low && thumb && category) {
            const sale = `-${parseInt(100 - (low * 100) / high)}%`;

            console.log(name, short, description, high, low, thumb, sale);
        } else {
            alert("Not emty !!!");
        }
    });
});

function getProd(ele) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `/admin/products/${id}`,
        success: (result) => {
            console.log(result.data);
            if (result.status == "success") {
                const product = result.data;
                $("#editNameProd").val(product.name);
                $("#editHighPriceProd").val(product.high);
                $("#editLowPriceProd").val(product.low);
                $("#editThumbProd").val(product.thumb);
                if (product.short) {
                    editShortProd.setData(product.short);
                } else {
                    editShortProd.setData("");
                }
                if (product.description) {
                    editProdDes.setData(product.description);
                } else {
                    editProdDes.setData("");
                }
                $("#editProductModal").modal("show");
            } else {
                alert(result.status);
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}
