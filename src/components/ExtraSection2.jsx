const ExtraSection2 = () => (
    <div className="bg-gray-200 py-8 px-6">
      <h2 className="text-2xl font-bold text-center mb-4">Top Rated Books</h2>
      <div className="flex justify-center space-x-4">
        {/* Example book cards */}
        <div className="p-4 border rounded shadow w-40">
          <img src="/images/book1.jpg" alt="Book 1" className="h-40 w-full object-cover mb-2" />
          <p className="text-center font-semibold">Book Title</p>
        </div>
        <div className="p-4 border rounded shadow w-40">
          <img src="/images/book2.jpg" alt="Book 2" className="h-40 w-full object-cover mb-2" />
          <p className="text-center font-semibold">Book Title</p>
        </div>
      </div>
    </div>
  );
  
  export default ExtraSection2;
  