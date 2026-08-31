/**
 * @file ErrorBoundary.jsx
 * @description Robust React Error Boundary with user-friendly recovery UI.
 */

import { Component } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CareScope ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-6 bg-[#FBEAEA] dark:bg-[#3B1515] border border-[#B33A3A]/30 rounded-2xl text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#B33A3A]/10 dark:bg-[#B33A3A]/30 text-[#B33A3A] dark:text-[#FCA5A5] flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} />
          </div>
          <h3 className="font-display text-lg font-bold text-[#0B2545] dark:text-[#F5F7FB] mb-2">
            Something went wrong in this module
          </h3>
          <p className="text-xs text-[#5B6B7A] dark:text-[#8EA1B5] mb-5 leading-relaxed">
            {this.state.error?.message || "An unexpected rendering error occurred. Please try reloading the view."}
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F7C6C] text-white text-xs font-semibold rounded-lg hover:bg-[#0C6A5C] transition-colors focus-visible:ring-2 focus-visible:ring-[#0F7C6C]"
          >
            <RotateCcw size={14} /> Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
