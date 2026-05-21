import { Button } from "../components/ui/Button";

export default function Workshop() {
    return (
        <div className="px-16">
            <section className="py-16 flex gap-10 justify-between items-center">
                <div className="w-1/2 flex flex-col gap-6">
                    <div>
                        <h1 className="text-5xl font-bold text-red-900">IT Workshop</h1>
                        <h2 className="text-2xl font-semibold text-red-900 mt-2">
                            "AI for a Sustainable Future: The Role of Z Generation in the Digital Era"
                        </h2>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        IT Workshop ini menjembatani antara potensi Generasi Z dan kekuatan AI untuk
                        menciptakan masa depan yang berkelanjutan. Peserta akan dibekali wawasan dan
                        alat untuk mentransformasi ide-ide inovatif menjadi solusi lingkungan yang nyata
                        dan terukur di era digital.
                    </p>

                    <div>
                        <Button label="Daftar Sekarang" variant="primary" />
                    </div>
                </div>

                <div className="w-1/2 flex justify-end">
                    <img
                        src="https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png"
                        alt="Maskot Workshop"
                        className="w-3/4"
                    />
                </div>
            </section>
        </div>
    );
}