from app import db

class Friend(db.Model):
    __tablename__ = 'friends'
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())


  def to_json(self):
    return {
      "id":self.id,
      "name":self.name,
      "role":self.role,
      "description":self.description,
      "gender":self.gender,
      "imgUrl":self.img_url,
    }

 
