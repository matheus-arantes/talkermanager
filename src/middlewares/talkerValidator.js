const isNameValid = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }

    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

const isAgeValid = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }

    if (age < 18 || !Number.isInteger(age)) {
        return res.status(400).json({
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
    }

    next();
};

const isTalkValid = (req, res, next) => {
    const { talk } = req.body;
       
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }

    next();
};

const isWatchedValid = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!regex.test(watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }

    next();
};

const isRateValid = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }

    if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }

    next();
};

module.exports = [
    isNameValid,
    isAgeValid,
    isTalkValid,
    isWatchedValid,
    isRateValid,
];
