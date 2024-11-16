export default function NotFound() {
    return (
      <div className="flex items-center justify-center min-h-[80vh] text-[#191E29]">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Ops, página não encontrada</h1>
          <a
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-[#CAFFD6] text-[#191E29] rounded hover:bg-[#caffd6b4]"
          >
            Voltar para a página inicial
          </a>
        </div>
      </div>
    );
  }
  