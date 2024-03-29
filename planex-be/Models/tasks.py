from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields
from flask_login import UserMixin
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

db = SQLAlchemy()


class TaskModel(db.Model, UserMixin):
    __tablename__ = "Task"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=True)
    deadline = db.Column(db.DATETIME)
    time_to_do = db.Column(db.DATETIME)
    repeat = db.Column(db.DATETIME)
    priority = db.Column(db.Text)
    user_id = db.Column(db.Integer)
    done = db.Column(db.Boolean)

    # def __init__(self, id, title, description, deadline, time_to_do, repeat, priority, user_id):
    #     self.id = id
    #     self.title = title
    #     self.description = description
    #     self.deadline = deadline
    #     self.time_to_do = time_to_do
    #     self.repeat = repeat
    #     self.priority = priority
    #     self.user_id = user_id

    def __repr__(self):
        return str(TaskSchema().dump(self))

    def info(self):
        return TaskSchema().dump(self)

class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TaskModel
        include_fk = True
        load_instance = True

# class TaskSchema(Schema):
#     title = fields.String()
#     description = fields.String()
#     deadline = fields.DateTime()
#     time_to_do = fields.DateTime()
#     repeat = fields.DateTime()
#     priority = fields.String()
#     user_id = fields.Integer()

