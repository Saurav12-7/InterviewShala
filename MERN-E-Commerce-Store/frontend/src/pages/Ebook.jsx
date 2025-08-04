import React from 'react';

import Footer from '../components/Footer';
import PdfCard from '../components/PdfCard';
import Offer from '../components/Offer'; 

const pdfData = [
  {
    id: 1,
    title: 'Mock Interview Questions',
    url:"https://1kboc1zd.simplepdf.eu/form/5b2d7dedefc4fdfb67fb8ca29dcc5b5f27d3ef38fbc8f3a0e404e606bbf714b9"
  },
    {
    id: 2,
    title: 'College Interview Questions',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },
  {
    id: 3,
    title: 'Rvce,msrit,Christ, PES,CMRIT Interview Question',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },
  {
    id: 4,
    title: 'Christ University Interview & MP',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },
  {
    id: 5,
    title: 'PES University Interview Questions',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },
  {
    id: 6,
    title: 'Infosys Interview Questions',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },
  {
    id: 7,
    title: 'Behavioral Questions',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },
  {
    id: 8,
    title: 'Technical Questions',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },
  {
    id: 9,
    title: 'Problem-Solving Questions',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },

  {
    id: 10,
    title: 'Personal and Motivational Questions',
    url: 'https://1kboc1zd.simplepdf.eu/form/041c2b2e9fe6e7e6a3ec3a92a1218923a7e445682938bc3da2bb431f64852806',
  },

];

const PdfCollectionPage = () => {
     return (
     <div>
       <Offer />
       <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center leading-snug mb-6 sm:mb-8">
        Free PDF Content
      </h1>
      
             <div className="pdf-list px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 items-center gap-4 sm:gap-6">
        {pdfData.map((pdf) => (
          <PdfCard key={pdf.id} title={pdf.title} url={pdf.url} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PdfCollectionPage;
