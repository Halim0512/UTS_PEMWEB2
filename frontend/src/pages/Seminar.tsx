import { Button } from "../components/ui/Button";

export default function Seminar() {
    return (
        <div className="px-16">
            <section className="py-16 flex gap-10 justify-between items-center">
                <div className="w-1/2 flex flex-col gap-6">
                    <div>
                        <h1 className="text-5xl font-bold text-red-900">IT Seminar</h1>
                        <h2 className="text-2xl font-semibold text-red-900 mt-2">
                            "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif"
                        </h2>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        Seminar nasional yang membahas strategi dan arsitektur teknologi untuk
                        menciptakan sistem di mana manusia dan AI bekerja sebagai mitra yang
                        sinergis. Yang bertujuan mengubah paradigma dari persaingan menjadi
                        kolaborasi, serta meningkatkan pengetahuan peserta dalam merancang
                        teknologi AI yang berpusat pada manusia.
                    </p>

                    <div>
                        <Button label="Daftar Sekarang" variant="primary" />
                    </div>
                </div>

                <div className="w-1/2">
                    <img
                        src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png"
                        alt="Maskot Seminar"
                        className="w-full max-w-sm mx-auto"
                    />
                </div>
            </section>
        </div>
    );
}