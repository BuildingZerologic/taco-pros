import TacoButton from "../components/TacoButton";
import "./rew.css";

export default function Rewards() {
    return (
        <>
            <section className="batman-rewards-section">
                <h2 className="batman-rewards-brand">REWARDS</h2>

                <div className="batman-rewards-grid">
                    <div className="lineN"></div>
                    <div className="batman-reward-card">
                        <div className="batman-step-number">1</div>
                        <h3 className="batman-step-title">CREATE AN ACCOUNT</h3>
                        <p className="batman-step-text">
                            To get started, join now. New members receive an automatic gift of $5 in
                            their TACO PROS Rewards account.
                        </p>
                    </div>
                    <div className="batman-reward-card">
                        <div className="batman-step-number">2</div>
                        <h3 className="batman-step-title">EARN POINTS</h3>
                        <p className="batman-step-text">
                            Get Rewarded For Every $1 Spent. Your Spendings = Your Earnings.
                        </p>
                    </div>
                    <div className="batman-reward-card">
                        <div className="batman-step-number">3</div>
                        <h3 className="batman-step-title">GET MEMBERS BENEFITS</h3>
                        <p className="batman-step-text">
                            Membership has its perks. Get special benefits like birthday treats and
                            members only surprises.
                        </p>
                    </div>
                </div>

                <div className="batman-rewards-btn">
                    <TacoButton text="CLICK TO LOGIN OR REGISTER"
                        width={window.innerWidth < 768 ? "155px" : "302px"}
                        height={window.innerWidth < 768 ? "51px" : "57px"}
                        styleType="1"
                        fontSize={window.innerWidth < 768 ? "18px" : "24px"}
                        link="https://www.toasttab.com/taco-pros-chicago-taylor-2200-west-taylor-street/rewardsSignup"
                    />
                </div>




            </section>

               <div className="mySpace"></div>

        </>
    )
}
