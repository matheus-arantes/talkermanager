const emailValidator = (req, res, next) => {
    const { email } = req.body;
    const regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const testeEmail = regex.test(email);
    
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!testeEmail) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

const passwordValidator = (req, res, next) => {
    console.log('Executing passwordValidator');
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

module.exports = {
    emailValidator,
    passwordValidator,
};