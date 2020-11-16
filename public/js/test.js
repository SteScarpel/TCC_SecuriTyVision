function teste(){
  const jsPDF = require('jspdf-new')
    const pdf = new JSPDF('p', 'mm', 'a4')
    pdf.text("Teste no front end")
    pdf.save('test.pdf')
}
