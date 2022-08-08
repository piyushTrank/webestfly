import * as React from "react";
import ExchangePdf from "./ExchangePdf.component";

import PdfDocument from "./PdfDocument.component";

const PDFLink = ({ data, pdfComp }) => {
  const { useState } = React;

  //   const initialData = undefined;

  //   const [data, setData] = useState(initialData);

  return (
    <span className="cm-btn cm-prim-bg cm-white-col">
      <PdfDocument title="Download PDF" document={pdfComp} />
      {/* <PdfDocument title="Download PDF" document={<ExchangePdf data={data} />} /> */}
    </span>
  );
};

export default PDFLink;
