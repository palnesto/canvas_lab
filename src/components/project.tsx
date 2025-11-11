import { usePartnerModal } from "./store/partnerModal";

const Project = () => {
  const { setOpen } = usePartnerModal();
  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20">
        {/* First card */} {/* First card → xpoll.io */}
        <div
          onClick={() => setOpen(true)}
          className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg cursor-pointer"
        >
          <img
            src="/cofrRisk.jpg"
            alt="Xpoll Project"
            className="w-full h-full object-fill object-right"
          />
        </div>
        {/* Second card → greatrwb.com */}
        <div
          onClick={() => setOpen(true)}
          className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg cursor-pointer"
        >
          <img
            src="/Narwal.jpg"
            alt="GRWB Project"
            className="w-full h-full object-fill object-right"
          />
        </div>
      </section>
      <section className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20">
        <div
          onClick={() => setOpen(true)}
          className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg cursor-pointer"
        >
          <img
            src="/Stowaway.jpg"
            alt="Xpoll Project"
            className="w-full h-full object-fill object-right"
          />
        </div>
        <div
          onClick={() => setOpen(true)}
          className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg cursor-pointer"
        >
          <img
            src="/PlantNutrition.jpg"
            alt="GRWB Project"
            className="w-full h-full object-fill object-right"
          />
        </div>
      </section>
      <section className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20">
        {/* First card */} {/* First card → xpoll.io */}
        <div
          onClick={() => setOpen(true)}
          className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg cursor-pointer"
        >
          <img
            src="/PlantNutrition.jpg"
            alt="Xpoll Project"
            className="w-full h-full object-fill"
          />
        </div>
        {/* Second card → greatrwb.com */}
        <div
          onClick={() => setOpen(true)}
          className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg cursor-pointer"
        >
          <img
            src="/AgenticArtificial.jpg"
            alt="GRWB Project"
            className="w-full h-full object-fill"
          />
        </div>
      </section>
      <section className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20">
        <div
          onClick={() => setOpen(true)}
          className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg cursor-pointer"
        >
          <img
            src="/Tokenization.jpg"
            alt="Xpoll Project"
            className="w-full h-full object-fill"
          />
        </div>
      </section>
    </>
  );
};

export default Project;
