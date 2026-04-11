import Link from "next/link";

export default function PaymentFailure() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-2xl shadow-md p-8 border border-rose-100">
        <p className="text-6xl mb-4">❌</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pagamento não aprovado
        </h1>
        <p className="text-gray-500 mb-6">
          Houve um problema com o pagamento. Tente novamente ou use outro método de pagamento.
        </p>
        <Link
          href="/"
          className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-full transition"
        >
          Voltar para Receitas
        </Link>
      </div>
    </div>
  );
}
