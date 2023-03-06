function saveXML() {
  // Get the JATS XML code from the textareas

  var journalMeta = document.getElementById("journal-meta").value.trim();
  var articleMeta = document.getElementById("article-meta").value.trim();
  var bodyContent = document.getElementById("body-content").value.trim();
  var backContent = document.getElementById("back-content").value.trim();
  //alert(backContent);

  // Create the XML document

  var doc = document.implementation.createDocument(
    "http://jats.nlm.nih.gov/ns/archiving/1.0",
    "article",
    null
  );

  // Create the root element
  var jats = doc.createElement("jats");
  jats.setAttribute("xmlns", "http://www.ncbi.nlm.nih.gov/JATS1");
  jats.setAttribute("xmlns:mml", "http://www.w3.org/1998/Math/MathML");
  jats.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  jats.setAttribute(
    "xmlns:oasis",
    "http://www.niso.org/standards/z39-96/ns/oasis-exchange/table"
  );

  // Create the front element and append the journal-meta and article-meta elements to it
  var front = doc.createElement("front");
  front.innerHTML = journalMeta + articleMeta;

  // Create the body element and append the bodyContent to it
  var body = doc.createElement("body");
  body.innerHTML = bodyContent;

  // Create the back element and append the backContent to it
  var back = doc.createElement("back");
  back.innerHTML = backContent;

  //alert(back.innerHTML);

  // Append the front, body, and back elements to the root element
  jats.appendChild(front);
  jats.appendChild(body);
  jats.appendChild(back);
  //alert(jats.innerHTML);

  // Serialize the XML document to a string
  var serializer = new XMLSerializer();
  var xmlString = serializer.serializeToString(jats);

  // Create a Blob with the XML string and set the content type to "text/xml"
  var blob = new Blob([xmlString], { type: "text/xml" });
/*
  // Create a download link for the file
  var downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = "jats.xml";

  // Append the download link to the document body and click it
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  */

  var blob = new Blob([xmlString], { type: "text/xml;charset=utf-8" });

  // create a link element to download the XML file
  var a = document.createElement("a");
  a.download = "jats.xml";
  a.href = URL.createObjectURL(blob);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(downloadLink);
}
