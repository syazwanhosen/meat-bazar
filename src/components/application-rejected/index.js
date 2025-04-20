"use client";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function WaitingForApproval() {
    return (
        <div >
            <NavigationBar />
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Application Rejected</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Sorry, your supplier application has been rejected by the admin.
                </p>
                <p className="text-gray-600">If you believe this is a mistake, please contact support.</p>
            </div>
            <Footer />
        </div>
    );
}
