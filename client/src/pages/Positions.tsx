const Positions = () => {
  return (
    <section className="container mx-auto max-w-6xl">
      <div className="py-5 pb-10">
        <h1 className="text-3xl font-bold">Positions</h1>
      </div>

      <div className="flex flex-row flex-nowrap overflow-x-auto mb-5 gap-5">
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Add Wallet
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Update Wallet
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Delete Wallet
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Add Investor
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Update Investor
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Delete Investor
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-5 min-h-[20em] border border-white/10 rounded-sm">
          Wallets
        </div>
        <div className="col-span-7 min-h-[20em] border border-white/10 rounded-sm">
          Investors
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7 min-h-[20em] border border-white/10 rounded-sm overflow-auto">
          Positions Table
        </div>
        <div className="col-span-5 min-h-[20em] border border-white/10 rounded-sm">
          Investor Actions Table
        </div>
      </div>
    </section>
  );
};

export default Positions;
