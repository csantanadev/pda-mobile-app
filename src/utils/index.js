export function FormataMoeda(value) {
    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};


export const baseUrlAvatar = {
    urlAvatar: '<url>'

}

