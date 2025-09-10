import { FlowingLines } from './FlowingLines'; // Make sure the path is correct
import '../styles/GetInvolved.css'

const GetInvolved: React.FC = () => (
    <section
        id="get-involved-alumni"
        className="min-h-screen w-screen flex flex-col justify-center items-center text-white p-0 relative"
    >
        <FlowingLines />
        <div className="z-10">
            <h2 className="text-4xl font-bold mb-6 text-shadow-glow">Get Involved</h2>
            <p className="max-w-3xl text-center mb-8">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore repellat, laudantium minima nemo quis placeat et quasi mollitia, alias veritatis impedit porro esse blanditiis autem expedita voluptas in dolores dolor.

                <br /><br />

                <button className="bg-red-600 hover:bg-white text-white font-bold py-2 px-4 rounded">
                    Alumni Form
                </button>

                <br /><br />
                <a href="#">Learn More</a>
            </p>
        </div>
    </section>
);

export default GetInvolved;