const { ipcRenderer } = require("electron");

const settingDetailsDiv = document.getElementById("setting_details");
const billingToDiv = document.getElementById("billing_to");
const invoiceDiv = document.getElementById("invoice_div_id");
const itemDetailsTable = document.getElementById("itemDetails");
const baseURL = "https://restaurant.bdtask.com/demo/";

ipcRenderer.on("setting:billingFromSent", (e, settingDetails) => {
  settingDetails.forEach((setting) => {
    let logo = document.createElement("img");
    logo.setAttribute("src", baseURL + setting.logo);

    let billingFromBtn = document.createElement("button");
    billingFromBtn.textContent = "Billing From";
    billingFromBtn.disabled = true;
    billingFromBtn.id = "billingFromId";

    let title = document.createElement("p");
    title.textContent = setting.title;
    title.className = "company_settings";
    title.id = "setting_title";

    let address = document.createElement("p");
    address.textContent = setting.address;
    address.className = "company_settings";

    let phone = document.createElement("p");
    phone.textContent = setting.phone;
    phone.className = "company_settings";

    let email = document.createElement("p");
    email.textContent = setting.email;
    email.className = "company_settings";
    // addressElement.textContent = setting.address;

    console.log("setting", setting.address);
    settingDetailsDiv.append(
      logo,
      billingFromBtn,
      title,
      address,
      phone,
      email
    );
  });
});

billingToDiv.addEventListener("click", () => {});
ipcRenderer.on("Posorder:invoiceInfo", (e, invoiceInfo) => {
  invoiceInfo.map((info) => {
    let invoiceHeading = document.createElement("h4");
    invoiceHeading.textContent = "Invoice";

    let invoiceNo = document.createElement("p");
    invoiceNo.textContent = "Invoice no: " + info.saleinvoice;
    invoiceNo.className = "invoice_info";
    invoiceNo.id = "invoice_info_id";

    let orderStatus = document.createElement("p");
    orderStatus.textContent =
      "Order status: " + (info.order_status == 2 ? "Pending" : "");
    orderStatus.className = "invoice_info";

    let billingDate = document.createElement("p");
    billingDate.textContent = "Billing data: " + info.order_date;
    billingDate.className = "invoice_info";
    invoiceDiv.append(invoiceHeading, invoiceNo, orderStatus, billingDate);
  });
});

ipcRenderer.on("Posorder:billingToInfo", (e, billingToInfo) => {
  billingToInfo.map((billingTo) => {
    let billingToBtn = document.createElement("button");
    billingToBtn.textContent = "Billing To";
    billingToBtn.disabled = true;
    billingToBtn.id = "billingToId";

    let customerName = document.createElement("p");
    customerName.textContent = billingTo.customer_name;
    customerName.style.fontWeight = "Bold";
    customerName.className = "billing_to";
    customerName.id = "billing_to_id";

    let customerAddress = document.createElement("p");
    customerAddress.textContent = "Address: " + billingTo.customer_address;
    customerAddress.className = "billing_to";

    let customerPhone = document.createElement("p");
    customerPhone.textContent = "Billing data: " + billingTo.customer_phone;
    customerPhone.className = "billing_to";
    billingToDiv.append(
      billingToBtn,
      customerName,
      customerAddress,
      customerPhone
    );
  });
});
ipcRenderer.on("Posorder:orderItemInfo", (e, orderItem) => {
  orderItem.map((i) => {
    let itemDetails = i.order_details;
    let jsonData = JSON.parse(itemDetails);

    //orderDetails.push();
    ipcRenderer.send("PosOrder:orderDetailsData", jsonData);
    jsonData.map((item) => {});
  });
});
ipcRenderer.on("OrderDetailInvoice:ItemsSent", (e, result) => {
  result.map((item) => {
    console.log("OrderDetailInvoice:ItemsSent", item);
    let tr = document.createElement("tr");

    let itemName = document.createElement("td");
    itemName.textContent = item.row.ProductName;

    let varientSize = document.createElement("td");
    varientSize.textContent = item.row.variantName;

    let unitPrice = document.createElement("td");
    unitPrice.textContent = item.row.price;
    let unitPriceInt = parseInt(unitPrice.textContent);

    let qty = document.createElement("td");
    qty.textContent = item.qty;
    let qtyInt = parseInt(qty.textContent);
    console.log("qtyInt", qtyInt);

    let totalPrice = document.createElement("td");
    totalPrice.textContent = unitPriceInt * qtyInt;

    let trSubTotal = document.createElement("tr");
    let subTotal = document.createElement("td");
    subTotal.colSpan = "4";
    subTotal.style.textAlign = "right";
    subTotal.textContent = "Subtotal";
    let subTotalAmount = document.createElement("td");
    subTotalAmount.textContent = item.row.price;

    let trDiscount = document.createElement("tr");
    let discount = document.createElement("td");
    discount.colSpan = "4";
    discount.style.textAlign = "right";
    discount.textContent = "Discount";
    let discountAmount = document.createElement("td");
    discountAmount.textContent = "0.0";

    let trServiceCharge = document.createElement("tr");
    let serviceCharge = document.createElement("td");
    serviceCharge.colSpan = "4";
    serviceCharge.style.textAlign = "right";
    serviceCharge.textContent = "Service charge";
    let serviceChargeAmount = document.createElement("td");
    serviceChargeAmount.textContent = "0.0";

    let trVat = document.createElement("tr");
    let vat = document.createElement("td");
    vat.colSpan = "4";
    vat.style.textAlign = "right";
    vat.textContent = "Vat";
    let vatAmount = document.createElement("td");
    let vatInt = parseFloat((item.row.price / 100) * 15).toFixed(2);
    vatAmount.textContent = vatInt;

    let trGrand = document.createElement("tr");
    let grandTotal = document.createElement("td");
    grandTotal.colSpan = "4";
    grandTotal.style.textAlign = "right";
    grandTotal.textContent = "Grand Total";
    let grandTotalAmount = document.createElement("td");
    let grand = item.row.price * ((100 + 15) / 100);
    let grandWithTax = parseFloat(grand).toFixed(2);
    grandTotalAmount.textContent = grandWithTax;

    let trTotalDue = document.createElement("tr");
    let totalDue = document.createElement("td");
    totalDue.colSpan = "4";
    totalDue.style.textAlign = "right";
    totalDue.textContent = "Total due";
    let totalDueAmount = document.createElement("td");
    totalDueAmount.textContent = grandWithTax;

    let trChangeDue = document.createElement("tr");
    let changeDue = document.createElement("td");
    changeDue.colSpan = "4";
    changeDue.style.textAlign = "right";
    changeDue.textContent = "Change due";
    let changeDueAmount = document.createElement("td");
    changeDueAmount.textContent = "0.0";

    tr.append(itemName, varientSize, unitPrice, qty, totalPrice);
    trSubTotal.append(subTotal, subTotalAmount);
    trDiscount.append(discount, discountAmount);
    trServiceCharge.append(serviceCharge, serviceChargeAmount);
    trVat.append(vat, vatAmount);
    trGrand.append(grandTotal, grandTotalAmount);
    trTotalDue.append(totalDue, totalDueAmount);
    trChangeDue.append(changeDue, changeDueAmount);

    itemDetailsTable.append(
      tr,
      trSubTotal,
      trDiscount,
      trServiceCharge,
      trVat,
      trGrand,
      trTotalDue,
      trChangeDue
    );
  });
});
