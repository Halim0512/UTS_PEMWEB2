import { Button } from "../components/ui/Button";

export default function Competition() {
    return (
        <div className="px-16">
            <section
                id="hero"
                className="py-16 flex gap-10 justify-between items-center"
            >
                <div className="w-2/3 flex flex-col gap-6">
                    <div>
                        <h1 className="text-5xl font-bold text-red-900">
                            IT Competition
                        </h1>

                        <h2 className="text-2xl font-semibold text-red-900 mt-2">
                            "From Creation to Innovation"
                        </h2>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        Kompetisi dalam INVOFEST ini mengusung tema{" "}
                        <strong>"From Creation to Innovation"</strong>.
                        Tema ini bertujuan mengajak generasi muda untuk
                        mengembangkan inovasi dan kreativitas guna membentuk
                        kelompok yang memiliki potensi luar biasa, yang mampu
                        mewujudkan masa depan yang berkelanjutan.
                    </p>

                    <div className="flex gap-4">
                        <a href="#cards">
                            <Button
                                label="INFO SELENGKAPNYA"
                                variant="primary"
                            />
                        </a>

                        <Button
                            label="HUBUNGI PANITIA"
                            variant="outline"
                        />
                    </div>
                </div>

                <div className="w-1/3">
                    <img
                        src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
                        alt="maskot invofest"
                        className="w-full"
                    />
                </div>
            </section>
        </div>
    );
}