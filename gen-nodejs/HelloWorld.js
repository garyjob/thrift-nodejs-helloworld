//
// Autogenerated by Thrift Compiler (0.9.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./hello_types');
//HELPER FUNCTIONS AND STRUCTURES

HelloWorld_greetings_args = function(args) {
  this.message = null;
  if (args) {
    if (args.message !== undefined) {
      this.message = args.message;
    }
  }
};
HelloWorld_greetings_args.prototype = {};
HelloWorld_greetings_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

HelloWorld_greetings_args.prototype.write = function(output) {
  output.writeStructBegin('HelloWorld_greetings_args');
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

HelloWorld_greetings_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
HelloWorld_greetings_result.prototype = {};
HelloWorld_greetings_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

HelloWorld_greetings_result.prototype.write = function(output) {
  output.writeStructBegin('HelloWorld_greetings_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

HelloWorldClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
HelloWorldClient.prototype = {};
HelloWorldClient.prototype.greetings = function(message, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_greetings(message);
};

HelloWorldClient.prototype.send_greetings = function(message) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('greetings', Thrift.MessageType.CALL, this.seqid);
  var args = new HelloWorld_greetings_args();
  args.message = message;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

HelloWorldClient.prototype.recv_greetings = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new HelloWorld_greetings_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('greetings failed: unknown result');
};
HelloWorldProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
HelloWorldProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

HelloWorldProcessor.prototype.process_greetings = function(seqid, input, output) {
  var args = new HelloWorld_greetings_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.greetings(args.message, function (err, result) {
    var result = new HelloWorld_greetings_result((err != null ? err : {success: result}));
    output.writeMessageBegin("greetings", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

