import React, { Component } from "react";
import jspdf from "jspdf";
import "jspdf-autotable";
import { CompanyContext } from "../../../../context/companyContext";
import { Buttons, IButtons } from "../../../Common/buttons";

class PaymentPdf extends Component {
  static contextType = CompanyContext;

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jspdf(orientation, unit, size);

    doc.setTextColor(47, 167, 217);
    doc.setFontSize(32);
    doc.text(marginLeft, 80, "SLExpress");
    doc.setFontSize(12);
    doc.text(450, 40, "Orioton Lanka(pvt)Ltd");
    doc.setFontSize(10);
    doc.text(370, 55, "Sri Lanka Institute of Information Technology");
    doc.text(464, 70, "New Building 12th Floor");
    doc.text(502, 85, "New Kandy Rd");
    doc.text(535, 100, "Malabe");
    doc.setFontSize(8);
    doc.text(470, 115, "E-mail: admin@slexpress.lk");
    doc.text(490, 125, "Call Us: 077 714 5020");
    doc.line(20, 150, 575, 150);

    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text(250, 200, "PAYMENT REPORT");
    doc.setFontSize(10);
    doc.text(
      marginLeft,
      240,
      "DATE : " +
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear()
    );
    doc.text(
      marginLeft,
      255,
      "TIME : " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds()
    );

    var my_date = new Date(this.props.data[0].paymentDate);
    var first = new Date(
      my_date.getFullYear(),
      my_date.getMonth(),
      1
    ).toLocaleString("en-NZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    var fTime = new Date(
      my_date.getFullYear(),
      my_date.getMonth(),
      1
    ).toLocaleString("no-NO", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    var last = new Date(
      my_date.getFullYear(),
      my_date.getMonth() + 1,
      0
    ).toLocaleString("en-NZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    var lTime = new Date(
      my_date.getFullYear(),
      my_date.getMonth() + 1,
      0,
      my_date.getHours() + 11,
      59,
      59
    ).toLocaleString("no-NO", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    doc.text(marginLeft, 270, "E-MAIL : " + this.context.admin.Email);
    doc.text(marginLeft, 288, "ADMIN : " + this.context.admin.First_Name);
    doc.text(marginLeft, 335, "FROM : " + first + "  " + fTime);
    doc.text(marginLeft, 355, "TO : " + last + "  " + lTime);
    doc.text(marginLeft, 380, "No of Recodes  : " + this.props.data.length);
    const headers = [["NO", "DATE", "TIME", "DEVELOPER NAME", "PAYMENTS(LKR)"]];

    const data = this.props.data.map((d, index) => [
      index + 1,
      new Date(d.paymentDate).toLocaleString("en-NZ", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      new Date(d.paymentDate).toLocaleString("no-NO", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
      d.developer,
      d.payment,
    ]);

    let content = {
      startY: 400,
      head: headers,
      body: data,
    };

    doc.autoTable(content);

    let finalY = doc.previousAutoTable.finalY;

    // let total = [this.props.total];
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(420, finalY + 10, 480, finalY + 10);
    doc.line(420, finalY + 40, 480, finalY + 40);
    doc.line(420, finalY + 45, 480, finalY + 45);
    doc.setFontSize(10);
    doc.text(
      330,
      finalY + 30,
      "Total Amount   :         " + this.props.total + " /="
    );

    doc.save("SLExpressPaymentReport.pdf");
  };

  render() {
    const { data } = this.props.data;
    //  console.log("TOTAL", this.props.total);
    return (
      <div>
        <IButtons
          onSubmit={() => this.exportPDF()}
          name="Download"
          color="blue"
          icon="download"
        />

        {/* <button onClick={() => this.exportPDF()}>Generate Report</button> */}
      </div>
    );
  }
}

export default PaymentPdf;
