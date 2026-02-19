import { useEffect, useState } from "react";
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    //Estados para o formulário de novo serviço
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDuration, setNewDuration] = useState('');

    //1. Carregar serviços ao montar página
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try{
            const response = await api.get('/services');
            setServices(response.data);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Função para adicionar serviço
    const handleAddService = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('/services', {
                name: newName,
                price: parseFloat(newPrice),
                duration: parseInt(newDuration)
            });

            setServices([...services, response.data]);
            setNewName('');
            setNewPrice('');
            setNewDuration('');
            toast.success("Serviço adicionado!");
        } catch (error) {
            toast.error("Erro ao adicionar serviço.");
        }
    };

    // 3. Função para deletar serviço
    const handleDelete = async (id) => {
        if(!window.confirm("Tem certeza que deseja remover este serviço?")) return;

        try{
            await api.delete(`/services/${id}`);
            setServices(services.filter(s => s.id !== id));
            toast.info("Serviço removido.");
        } catch (error) {
            toast.error("Erro ao deletar.");
        }
    };

    if (loading) return < div className="p-10 text-center">Carregando serviços...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">GEstão de Serviços</h1>

            {/* Formulário de Cadastr */}
            <form onSubmit={handleAddService} className="bg-white p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome do Serviço</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                    <input
                        type="number"
                        value={newPrice}
                        onChange={e => setNewPrice(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                    <input
                        type="number"
                        value={newDuration}
                        onChange={e => setNewDuration(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
                    Adicionar
                </button>
            </form>
            {/* Lista de Serviços */}
            <div className="grid gap-4">
                {services.length === 0 ? (
                    <p className="text-gray-500">NEnhum serviço cadatsrado</p>
                ) : (
                    services.map(service => (
                        <div key={service.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{service.name}</h3>
                                <p className="text-gray-600">{service.duration}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="text-red-500 hover:text-red-700 font-medium"
                            >
                                Remover
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
