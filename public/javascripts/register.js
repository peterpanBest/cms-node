try {
  error;    
} catch (error) {
  $.ajax({
    url: "/api/log/add",
    data: {
      apiUrl: "https://www.baidu.com"
    },
    dataType: "json",
    type: "post",
    timeout: 5000,
    success: function(data) {
      console.log("success", JSON.stringify(data));
    },
    error: function(XMLHttpRequest, status) {
      console.log("error");
    }
  });
}

// $("#btn").click(function () {
//   $.ajax({
//     url: "/api/log/add",
//     data: {
//       apiUrl: "https://www.baidu.com"
//     },
//     dataType: "json",
//     type: "post",
//     timeout: 5000,
//     success: function (data) {
//       console.log("success", JSON.stringify(data));
//     },
//     error: function (XMLHttpRequest, status) {
//       console.log("error");
//     }
//   });
// });



