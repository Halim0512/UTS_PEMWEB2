import { Button } from "../components/ui/Button";

export default function Talkshow() {
    return (
        <div className="px-16">
            <section className="py-16 flex gap-10 justify-between items-center">
                <div className="w-1/2 flex flex-col gap-6">
                    <div>
                        <h1 className="text-5xl font-bold text-red-900">IT Talkshow</h1>
                        <h2 className="text-2xl font-semibold text-red-900 mt-2">
                            "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan"
                        </h2>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        Talkshow "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan"
                        Sebuah diskusi interaktif yang mengeksplorasi cara mengintegrasikan nilai-nilai
                        kemanusiaan seperti etika, empati, dan kreativitas ke dalam pengembangan
                        kecerdasan buatan. yang bertujuan menginspirasi audiens untuk membangun dan
                        memanfaatkan AI sebagai alat kolaboratif yang memperkuat potensi unik manusia,
                        bukan sebagai penggantinya.
                    </p>

                    <div>
                        <Button label="Daftar Sekarang" variant="primary" />
                    </div>
                </div>

                <div className="w-1/2 flex justify-end">
                    <img
                        src="https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png"
                        alt="Maskot Talkshow"
                        className="w-3/4"
                    />
                </div>
            </section>
        </div>
    );
}