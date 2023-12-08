import Task from '../models/taskModel.js';

export const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.user._id;

        const taskObj = {
            description,
            createBy: userId
        };

        const task = await Task.create(taskObj);
        return res.status(201).json(task);

    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findOneAndUpdate({ _id: taskId, createBy: userId }, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);

    } catch (error) {
        res.status(400).json({ mess: 'fail while updatind' });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findByIdAndDelete({ _id: taskId, createBy: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({message: 'Task was deleted successfully'});

    } catch (error) {
        res.status(400).json({ mess: 'fail while deleting' });
    }
};


export const getTasksByUserId = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({ createBy: userId });

        return res.status(200).json(tasks);

    } catch (error) {
        res.status(400).json({ mess: 'fail while getting task by user Id' });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        
        const tasks = await Task.find();

        return res.status(200).json(tasks);

    } catch (error) {
        res.status(400).json({ mess: 'fail while getting task by user Id' });
    }
};

export const getTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = req.user._id;

        const task = await Task.findOne({ _id: taskId, createBy: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found 123' });
        }

        return res.status(200).json(task);

    } catch (error) {
        res.status(400).json({ mess: 'fail' });
    }
}