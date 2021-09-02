export function FormataMoeda(value) {
    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};


export const baseUrlAvatar = {
    urlAvatar: 'https://www.peladadosamigos.com.br/img/avatar/'
}

