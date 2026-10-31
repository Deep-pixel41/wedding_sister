import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Marquee from "@/components/Marquee";
import InvitationCard from "@/components/InvitationCard";
import Ceremonies from "@/components/Ceremonies";
import Quotes from "@/components/Quotes";
import Venue from "@/components/Venue";
import BlessingWall from "@/components/BlessingWall";
import BlessingsGratitude from "@/components/BlessingsGratitude";
import FloatingPetals from "@/components/FloatingPetals";
import MusicToggle from "@/components/MusicToggle";

export default function GuestView() {
    return (
        <div className="relative min-h-screen bg-ivory text-ink" data-testid="guest-invitation-view">
            <Navbar />
            <main>
                <Hero />
                <Countdown />
                <Marquee />
                <InvitationCard />
                <Ceremonies />
                <Quotes />
                <Venue />
                <BlessingWall />
                <BlessingsGratitude />
            </main>
            <FloatingPetals />
            <MusicToggle />
        </div>
    );
}
