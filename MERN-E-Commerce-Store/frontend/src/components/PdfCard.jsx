import React, { useState } from 'react';
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

const PdfCard = ({ title, url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(url);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full max-w-[600px] h-auto min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] pdf-card flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500 mb-4 sm:mb-6 lg:mb-8 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
          </svg>
        </div>
        <EmbedPDF>
          <a href={url} className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download PDF
          </a>
        </EmbedPDF>
        <h2 className='text-sm sm:text-base lg:text-lg font-bold pdf-card-heading text-center mt-4 text-white leading-tight'>{title}</h2>
      </div>
    </div>
  );
};

export default PdfCard;

