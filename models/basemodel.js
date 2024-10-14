const { Model, NotFoundError } = require('objection')

class BaseModel extends Model {
    static createNotFoundError (queryContext, props) {
        const name = this.name
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function (str) { return str.toUpperCase() })
            .trim()
        return new NotFoundError({ ...props, modelClass: this, message: name + ' not found' })
    }
}

module.exports = BaseModel