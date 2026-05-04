import Coin from "@/src/components/coin";
import { getCoin } from "@/src/services/coinApi";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <Coin id={id} />
        </div>
    );
};

export default Page;