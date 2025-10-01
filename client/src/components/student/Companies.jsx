

const companyLogos = {
  Accenture: '/Accenture.svg',
  Adobe: '/Adobe.svg',
  FreeCodeCamp: '/FreeCodeCamp.svg',
  Microsoft: '/Microsoft.svg',
  PayPal: '/PayPal.svg',
};

const Companies = () => {
  return (
    <div className="flex flex-col text-center my-16 py-10">
      <p className="text-gray-700 text-sm sm:text-lg mb-6 sm:mb-10">
        Trusted by learners from
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-6 md:gap-12 items-center justify-center">
        {Object.entries(companyLogos).map(([name, logo]) => (
        <div
          key={name} // ✅ Now correct
          className="border border-gray-300 p-3 rounded bg-white shadow-sm hover:shadow-md transition"
        >
          <img
            src={logo}
            alt={`${name} Logo`}
            className="w-20 h-10 object-contain"
          />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Companies;
